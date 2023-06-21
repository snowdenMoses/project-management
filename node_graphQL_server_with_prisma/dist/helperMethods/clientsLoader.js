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
exports.cacheUser = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const server_1 = require("../server");
function batchclientFn(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        const clients = yield server_1.prisma.client.findMany({
            where: {
                id: {
                    in: ids
                }
            }
        });
        const clientsMap = clients.reduce((map, currentclient) => {
            map[currentclient.id] = currentclient;
            return map;
        }, {});
        return ids.map(id => clientsMap[id]);
    });
}
exports.cacheUser = new dataloader_1.default(batchclientFn);
