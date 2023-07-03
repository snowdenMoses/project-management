"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
type Query{
    client(id: String): Client
    clients: [Client]
    projects: [Project]
    project(id: String): Project
    currentClient: Client
}
type Client{
    id: String
    first_name: String
    last_name: String
    role: String
    email: String
    created_at: String
    updated_at: String
    password: String
    phone_number: String
    projects: [Project]
}

type Project{
    id: String
    name: String
    description: String
    status: String
    duration: Int
    created_at: String
    updated_at: String
    client: Client
    message: String
}

type Mutation{
    createClient(data: createClientInput): Token
    createProject(client_id: String , data: createProjectInput): Project
    deleteProject(id: String): Project
    deleteClient(id: String): Client
    updateClient(id: String, data: updateClientInput): Client
    updateProject(project_id: String, data: updateProjectInput): Project
    login(data: clientLoginInput): Token
}
type Token{
    clientDetails: Client
    token: String
    message: String
}

input createClientInput{
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    phone_number: String
    role: String
}

input createProjectInput{
    name: String!
    description: String!
    duration: Int!
    client_id: String!
    status: String
}

input clientLoginInput{
    password: String
    email: String
}

input updateClientInput{
    first_name: String
    last_name: String
    email: String
    password: String
    phone_number: String
    role: String
    status: String
}

input updateProjectInput{
    name: String
    description: String
    duration: Int
    client_id: String
    status: String
}
`;
