"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const server_1 = require("../server");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const aws_1 = __importDefault(require("../helperMethods/aws"));
exports.Mutation = {
    uploadFile(parent, { file }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { createReadStream, filename, mimetype, encoding } = yield file;
            return { filename, mimetype, encoding };
        });
    },
    createclient(parent, args, ctx, info) {
        return __awaiter(this, void 0, void 0, function* () {
            let password = "";
            args.data.password = yield bcrypt_1.default.hash(args.data.password, 10);
            const emailExist = yield server_1.prisma.client.findUnique({ where: { email: args.data.email } });
            if (emailExist)
                throw new Error("Email Already Exist");
            const client = yield server_1.prisma.client.create({
                data: Object.assign({}, args.data)
            });
            return client;
        });
    },
    login(parent, args, ctx, info) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientDetails = yield server_1.prisma.client.findUnique({
                where: {
                    email: args.data.email
                }
            });
            if (!clientDetails)
                return "Please Check Your Password or Email";
            const isUser = yield bcrypt_1.default.compare(args.data.password, clientDetails ? clientDetails.password : "");
            if (!isUser)
                throw new Error("Login Details not correct");
            const token = jsonwebtoken_1.default.sign({
                userId: clientDetails === null || clientDetails === void 0 ? void 0 : clientDetails.id
            }, 'secret', { expiresIn: 60 * 60 });
            return { clientDetails, token, message: "You have successfully Logged in" };
        });
    },
    createproject(parent, args, ctx, info) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield server_1.prisma.project.create({
                data: {
                    client_id: args === null || args === void 0 ? void 0 : args.client_id,
                    name: args.data.name,
                    description: args.data.description,
                    price: args.data.price,
                }
            });
            const { createReadStream, filename, mimetype, encoding } = yield args.data.file;
            const stream = createReadStream();
            console.log("Stream", stream);
            (0, aws_1.default)(args.data.imageFile);
            for (let i = 0; i < args.data.categories.length; i++) {
                yield server_1.prisma.categoryproject.create({
                    data: {
                        project_id: project === null || project === void 0 ? void 0 : project.id,
                        category_id: args.data.categories[i]
                    }
                });
            }
            return project;
        });
    },
    createCategory(parent, args, ctx, info) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield server_1.prisma.category.create({
                data: {
                    name: args.data.name
                }
            });
            return { category, message: "Successful" };
        });
    },
    deleteproject(parent, args, ctx, info) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectExist = yield server_1.prisma.project.findUnique({ where: { id: args.id } });
            if (!projectExist)
                throw new Error("project does not exist");
            const project = yield server_1.prisma.project.delete({
                where: {
                    id: args.id
                }
            });
            return project;
        });
    },
    updateclient(parent, args, ctx, info) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientExist = yield server_1.prisma.client.findUnique({ where: { id: args.id } });
            if (args.data.password) {
                args.data.password = yield bcrypt_1.default.hash(args.data.password, 10);
            }
            if (!clientExist)
                throw new Error("client does not exist");
            const client = yield server_1.prisma.client.update({
                where: {
                    id: args.id
                }, data: Object.assign({}, args.data)
            });
            return client;
        });
    },
};
