"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const clientsLoader_1 = require("../helperMethods/clientsLoader");
exports.Project = {
    client(parent, args, ctx, info) {
        // return prisma.client.findUnique({where:{id: parent.client_id}})
        return clientsLoader_1.cacheUser.load(parent.client_id);
    }
};
