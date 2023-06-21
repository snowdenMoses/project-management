"use strict";
// import { faker } from '@faker-js/faker';
// import { Iproject } from '../interface/project.interface';
// import { prisma } from '../server';
// import { Iclient } from '../interface/client.interface';
// function createRandomclients(): Iclient {
//     return {
//         first_name: faker.person.firstName(),
//         last_name: faker.person.lastName(),
//         email: faker.internet.email(),
//         password: faker.internet.password(),
//     };
// }
// function createRandomprojects(client_id): Iproject {
//     return {
//         name: faker.commerce.projectName(),
//         description: faker.commerce.projectDescription(),
//         price: Number(faker.commerce.price()),
//         client_id: client_id,
//     };
// }
// async function createclients(callback) {
//     const clients: Iclient[] = faker.helpers.multiple(createRandomclients, {
//         count: 20,
//     });
//     await prisma.client.createMany({ data: clients })
//     callback()
// }
// async function createprojects() {
//     console.log("Starting.......")
//     const allclients = await prisma.client.findMany()
//     const arrayOfclientsId = allclients.map(client => client.id)
//     for (let i = 0; i < arrayOfclientsId.length; i++) {
//         await prisma.project.create({
//             data: createRandomprojects(arrayOfclientsId[i])
//         })
//     }
//     console.log("Completed!!!!")
// }
// createclients(createprojects)
