export const typeDefs = `#graphql
scalar Upload
type Query{
    client(id: String): Client
    clients: [Client]
    projects: [Project]
    currentclient: Client
}
type Client{
    id: String
    first_name: String
    last_name: String
    email: String
    created_at: String
    updated_at: String
    password: String
    projects: [Project]
}

type Project{
    id: String
    name: String
    description: String
    price: Int
    created_at: String
    updated_at: String
    client: Client
}
type Mutation{
    createClient(data: createclientInput): client
    createProject(client_id: String , data: createprojectInput): project
    deleteProject(id: String): project
    updateClient(id: String, data: updateclientInput): client
    login(data: clientLoginInput): Token
}
type Token{
    clientDetails: client
    token: String
    message: String
}

input createClientInput{
    first_name: String
    last_name: String
    email: String
    password: String
}

input createProjectInput{
    name: String
    description: String
    price: Int
    # client_id: String
    imageFile: Upload
    categories: [String]!
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
}
`