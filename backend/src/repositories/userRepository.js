"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const client_1 = require("@prisma/client");
class UserRepository {
    async findByEmail(email) {
        return prisma_1.default.user.findUnique({
            where: { email },
        });
    }
    async findById(id) {
        return prisma_1.default.user.findUnique({
            where: { id },
        });
    }
    async create(data) {
        return prisma_1.default.user.create({
            data,
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=userRepository.js.map