"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const server_1 = require("../server");
exports.client = {
    projects(parent, args, ctx, info) {
        return server_1.prisma.project.findMany({ where: { client_id: parent.id } });
    }
};
