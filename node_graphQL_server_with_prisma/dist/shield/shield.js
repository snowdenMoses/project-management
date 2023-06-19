"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = void 0;
const { rule, shield, and, or, not } = require('graphql-shield');
// Define your rules
const isAuthenticated = rule()((parent, args, { currenUserId }) => {
    // Assuming you have a user object in the context
    return currenUserId !== null;
});
// const isAdmin = rule()((parent, args, { user }) => {
//     return user.role === 'admin';
// });
// Define your permissions
exports.permissions = shield({
    Query: {
        // Allow all authenticated users to access the 'hello' query
        currentclient: isAuthenticated,
        clients: isAuthenticated,
        // Allow only admins to access the 'secret' query
        // secret: isAdmin,
        // Allow all authenticated users to access the 'public' query
        // public: isAuthenticated,
    },
    // Mutation: {
    //     // Allow only authenticated users to access the 'createPost' mutation
    //     createPost: isAuthenticated,
    //     // Allow only admins to access the 'deletePost' mutation
    //     deletePost: isAdmin,
    // },
});
