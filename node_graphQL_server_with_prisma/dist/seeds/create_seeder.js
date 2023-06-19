"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const server_1 = require("../server");
function createRandomclients() {
    return {
        first_name: faker_1.faker.person.firstName(),
        last_name: faker_1.faker.person.lastName(),
        email: faker_1.faker.internet.email(),
        password: faker_1.faker.internet.password(),
    };
}
function createRandomprojects(client_id) {
    return {
        name: faker_1.faker.commerce.projectName(),
        description: faker_1.faker.commerce.projectDescription(),
        price: Number(faker_1.faker.commerce.price()),
        client_id: client_id,
    };
}
function createclients(callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const clients = faker_1.faker.helpers.multiple(createRandomclients, {
            count: 20,
        });
        yield server_1.prisma.client.createMany({ data: clients });
        callback();
    });
}
function createprojects() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Starting.......");
        const allclients = yield server_1.prisma.client.findMany();
        const arrayOfclientsId = allclients.map(client => client.id);
        for (let i = 0; i < arrayOfclientsId.length; i++) {
            yield server_1.prisma.project.create({
                data: createRandomprojects(arrayOfclientsId[i])
            });
        }
        console.log("Completed!!!!");
    });
}
createclients(createprojects);
