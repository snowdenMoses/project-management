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
const errorHandling_1 = __importDefault(require("../helperMethods/errorHandling"));
exports.Mutation = {
    createClient(parent, args, ctx, info) {
        return __awaiter(this, void 0, void 0, function* () {
            if (args.data.first_name == "" || args.data.last_name == "" || args.data.email == "" || args.data.password == "" || args.data.phone_number == "") {
                throw new errorHandling_1.default(400, "Please fill in all the required fields");
            }
            let password = "";
            args.data.password = yield bcrypt_1.default.hash(args.data.password, 10);
            const emailExist = yield server_1.prisma.client.findUnique({ where: { email: args.data.email } });
            if (emailExist)
                throw new Error("Email Already Exist");
            const client = yield server_1.prisma.client.create({
                data: Object.assign({}, args.data)
            });
            const token = jsonwebtoken_1.default.sign({
                userId: client === null || client === void 0 ? void 0 : client.id
            }, 'secret', { expiresIn: 60 * 60 });
            return Object.assign(Object.assign({}, client), { token, message: "User created successfully" });
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
                throw new errorHandling_1.default(400, "Please Check Your Password or Email");
            const isUser = yield bcrypt_1.default.compare(args.data.password, clientDetails ? clientDetails.password : "");
            if (!isUser)
                throw new errorHandling_1.default(404, "Login Details are not correct");
            const token = jsonwebtoken_1.default.sign({
                userId: clientDetails === null || clientDetails === void 0 ? void 0 : clientDetails.id
            }, 'secret', { expiresIn: 60 * 60 });
            return { clientDetails, token, message: "You have successfully Logged in" };
        });
    },
    createProject(parent, args, ctx, info) {
        return __awaiter(this, void 0, void 0, function* () {
            if (args.data.duration == 0) {
                throw new errorHandling_1.default(400, "Duration must be greater than 0");
            }
            if (args.data.name == "" ||
                args.data.description == "" ||
                args.data.duration == "" ||
                args.data.status == "" ||
                args.data.client_id == "") {
                throw new errorHandling_1.default(400, "Please fill in all the required fields");
            }
            const project = yield server_1.prisma.project.create({
                data: Object.assign({ client_id: args === null || args === void 0 ? void 0 : args.client_id }, args.data)
            });
            return project;
        });
    },
    deleteProject(parent, args, ctx, info) {
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
    updateClient(parent, args, ctx, info) {
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
    updateProject(parent, args, ctx, info) {
        return __awaiter(this, void 0, void 0, function* () {
            const projectExist = yield server_1.prisma.project.findUnique({ where: { id: args.project_id } });
            if (!projectExist)
                throw new Error("project does not exist");
            const project = yield server_1.prisma.project.update({
                where: {
                    id: args.project_id
                }, data: Object.assign({}, args.data)
            });
            return Object.assign(Object.assign({}, project), { message: "Successfully Updated" });
        });
    },
};
