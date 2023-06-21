import { prisma } from "../server"
import { cacheUser } from "../helperMethods/clientsLoader";

export const Project = {
    client(parent, args, ctx, info) {
        // return prisma.client.findUnique({where:{id: parent.client_id}})
        return cacheUser.load(parent.client_id)

    }
}