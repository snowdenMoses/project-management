import { prisma } from "../server"
import bcrypt from "bcrypt"
import { Client } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken"
import HttpException from "../helperMethods/errorHandling"

export const Mutation = {
    async createClient(parent, args, ctx, info) {
        if(args.data.first_name == "" || args.data.last_name == "" || args.data.email == "" || args.data.password == "" || args.data.phone_number == "" )
            {
                throw new HttpException(400, "Please fill in all the required fields")
            }
        let password = ""
        args.data.password = await bcrypt.hash(args.data.password, 10);
        const emailExist = await prisma.client.findUnique({ where: { email: args.data.email } })
        if (emailExist) throw new Error("Email Already Exist")
        const client = await prisma.client.create({
            data: {
                ...args.data,
            }
        })

        const token = jwt.sign({
            userId: client?.id
        }, 'secret', { expiresIn: 60 * 60 });
        return { ...client, token, message: "User created successfully" }
    },

    async login(parent, args, ctx, info) {
        const clientDetails: Client | null = await prisma.client.findUnique({
            where: {
                email: args.data.email
            }
        })
        if (!clientDetails) throw new HttpException(400, "Please Check Your Password or Email") 
        const isUser = await bcrypt.compare(args.data.password, clientDetails ? clientDetails.password : "");
        if (!isUser) throw new HttpException(404, "Login Details are not correct")
        const token = jwt.sign({
            userId: clientDetails?.id
        }, 'secret', { expiresIn: 60 * 60 });

        return { clientDetails, token, message: "You have successfully Logged in" }
    },
    async createProject(parent, args, ctx, info) {
        if(args.data.duration == 0)
            {
                throw new HttpException(400, "Duration must be greater than 0")
            }
        if(args.data.name == "" || 
            args.data.description == "" || 
            args.data.duration == "" || 
            args.data.status == "" || 
            args.data.client_id == "" )
            {
                throw new HttpException(400, "Please fill in all the required fields")
            }
        const project = await prisma.project.create({
            data: {
                client_id: args?.client_id,
                ...args.data
            }
        })
        return project
    },
    async deleteProject(parent, args, ctx, info) {
        const projectExist = await prisma.project.findUnique({ where: { id: args.id } })
        if (!projectExist) throw new Error("project does not exist")
        const project = await prisma.project.delete({
            where: {
                id: args.id
            }
        })
        return project
    },
    async updateClient(parent, args, ctx, info) {
        const clientExist = await prisma.client.findUnique({ where: { id: args.id } })
        if (args.data.password) {
            args.data.password = await bcrypt.hash(args.data.password, 10);
        }
        if (!clientExist) throw new Error("client does not exist")
        const client = await prisma.client.update({
            where: {
                id: args.id
            }, data: {
                ...args.data
            }
        })
        return client
    },
    async updateProject(parent, args, ctx, info) {
        const projectExist = await prisma.project.findUnique({ where: { id: args.project_id } })
        if (!projectExist) throw new Error("project does not exist")
        const project = await prisma.project.update({
            where: {
                id: args.project_id
            }, data: {
                ...args.data
            }
        })
        return {...project, message: "Successfully Updated"}
    },
}