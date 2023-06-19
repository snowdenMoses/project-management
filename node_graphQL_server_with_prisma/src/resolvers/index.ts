import { Query } from "./query.resolver"
import { Mutation } from "./mutation.resolver"
import { project } from "./project.resolver"
import { client } from "./client.resolver"
export const resolvers = {
    Query,
    Mutation,
    project,
    client
}