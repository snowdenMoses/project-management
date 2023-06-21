"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const clientIdFromToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, "secret");
    }
    catch (err) {
    }
};
exports.default = clientIdFromToken;
