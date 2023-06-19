import { prisma } from "../server"

export const client = {
    projects(parent, args, ctx, info) {
        return prisma.project.findMany({ where: { client_id: parent.id } })
    }
}