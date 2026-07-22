"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const client_1 = require("@prisma/client");
class TaskRepository {
    async findAll(userId, filters) {
        const { status, priority, search } = filters;
        return prisma_1.default.task.findMany({
            where: {
                userId,
                ...(status && { status }),
                ...(priority && { priority }),
                ...(search && {
                    OR: [
                        { title: { contains: search, mode: 'insensitive' } },
                        { description: { contains: search, mode: 'insensitive' } },
                    ],
                }),
            },
            orderBy: [
                { status: 'asc' }, // Completed usually last
                { dueDate: 'asc' },
            ],
        });
    }
    async findById(id, userId) {
        return prisma_1.default.task.findFirst({
            where: { id, userId },
        });
    }
    async create(data) {
        return prisma_1.default.task.create({
            data,
        });
    }
    async update(id, userId, data) {
        return prisma_1.default.task.updateMany({
            where: { id, userId },
            data,
        });
    }
    async delete(id, userId) {
        return prisma_1.default.task.deleteMany({
            where: { id, userId },
        });
    }
    async getSummary(userId) {
        const tasks = await prisma_1.default.task.findMany({
            where: { userId },
        });
        const total = tasks.length;
        const completed = tasks.filter(t => t.status === client_1.Status.COMPLETED).length;
        const pending = tasks.filter(t => t.status === client_1.Status.PENDING).length;
        const inProgress = tasks.filter(t => t.status === client_1.Status.IN_PROGRESS).length;
        const now = new Date();
        const overdue = tasks.filter(t => t.status !== client_1.Status.COMPLETED && t.dueDate < now).length;
        return {
            total,
            completed,
            pending,
            inProgress,
            overdue,
        };
    }
}
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=taskRepository.js.map