import DataLoader from "dataloader";
import { prisma } from "../server";

async function batchclientFn(ids) {
    const clients = await prisma.client.findMany({
        where: {
            id: {
                in: ids
            }
        }
    })
    const clientsMap = clients.reduce((map, currentclient) => {
        map[currentclient.id] = currentclient
        return map
    }, {})

    return ids.map(id => clientsMap[id])
}
export const cacheUser = new DataLoader(batchclientFn)