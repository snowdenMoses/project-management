"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const query_resolver_1 = require("./query.resolver");
const mutation_resolver_1 = require("./mutation.resolver");
const project_resolver_1 = require("./project.resolver");
const client_resolver_1 = require("./client.resolver");
const category_resolver_1 = require("./category.resolver");
exports.resolvers = {
    Query: query_resolver_1.Query,
    Mutation: mutation_resolver_1.Mutation,
    project: project_resolver_1.project,
    client: client_resolver_1.client,
    Category: category_resolver_1.Category
};
