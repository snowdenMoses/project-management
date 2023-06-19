import { prisma } from "../server"

export const Query = {
    async client(parent: any, { id }: any, ctx: any, info: any) {
        return await prisma.client.findUnique({ where: { id } })
    },
    async currentClient(_: any, __: any, { currenUserId }: any, info: any) {
        // if (currenUserId) {
        //     try {
        return await prisma.client.findUnique({ where: { id: currenUserId } })
        //     }
        //     catch (err) {
        //     }
        // }
    },
    async clients() {
        return await prisma.client.findMany()
    },
    async projects() {
        return await prisma.project.findMany({
            orderBy: {
                created_at: "desc"
            }
        })
    }
}