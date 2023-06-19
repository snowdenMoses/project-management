"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
scalar Upload
type Query{
    client(id: String): client
    clients: [client]
    projects: [project]
    currentclient: client
    categories: [Category]
}
type client{
    id: String
    first_name: String
    last_name: String
    email: String
    created_at: String
    updated_at: String
    password: String
    projects: [project]
}

type project{
    id: String
    name: String
    description: String
    price: Int
    created_at: String
    updated_at: String
    client: client
    categories: [Category]
}
type Image{
    id: String
    url: String
    project: project
    created_at: String
    updated_at: String
}
type Category{
    id: String
    name: String
    projects: [project]
    created_at: String
    updated_at: String
}
type Categoryproject{
    id: String
    category: [Category]
    project: [project]
    created_at: String
    updated_at: String
}

type Mutation{
    createclient(data: createclientInput): client
    createproject(client_id: String , data: createprojectInput): project
    deleteproject(id: String): project
    updateclient(id: String, data: updateclientInput): client
    login(data: clientLoginInput): Token
    createCategory(data: CreateCategoryInput): CategoryPayload
    uploadFile(file: Upload!): File!
}
type File{
    filename: String
    mimetype: String
    encoding: String
}
type Token{
    clientDetails: client
    token: String
    message: String
}
type CategoryPayload{
    category: Category
    message: String
}
# type Image{
#     lastModified: String
#     lastModifiedDate: String
#     name: String
#     size: String
#     type: String
#     webkitRelativePath: String
# }

# type Subscription{
#     count: Int
# }

input createclientInput{
    first_name: String
    last_name: String
    email: String
    password: String
}

input createprojectInput{
    name: String
    description: String
    price: Int
    # client_id: String
    imageFile: Upload
    categories: [String]!
}
input CreateCategoryInput{
    name: String
}

input clientLoginInput{
    password: String
    email: String
}

input updateclientInput{
    first_name: String
    last_name: String
    email: String
    password: String
}
`;
