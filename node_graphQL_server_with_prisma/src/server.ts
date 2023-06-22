import { ApolloServer } from "@apollo/server";
import { PrismaClient } from "@prisma/client";
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import { json, text } from 'body-parser';
import cors from 'cors';
import { typeDefs } from "./typeDef/typeDef";
import { resolvers } from "./resolvers";
import clientIdFromToken from "./authentication/clientIdFromToken";
import { permissions } from "./shield/shield";


const port = process.env.PORT || 4000
export const prisma = new PrismaClient()


const app = express();

const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [permissions],
    csrfPrevention: false

});
async function serverFunction() {
    await server.start();
    app.use(
        cors(),
        json(),
        expressMiddleware(server, {
            context: async ({ req }) => {
                const bearerToken = String(req.headers.authorization)
                const token = bearerToken.split("Bearer ")[1]
                const currenUserId = await clientIdFromToken(token)
                return {
                    currenUserId: currenUserId?.userId
                }
            },
        }),
    );
    await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
    console.log(`🚀 Server ready at ${process.env.HOST}`);
}
serverFunction()