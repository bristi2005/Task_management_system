"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const taskRepository_1 = require("../repositories/taskRepository");
const client_1 = require("@prisma/client");
class TaskService {
    taskRepository = new taskRepository_1.TaskRepository();
    async getTasks(userId, filters) {
        return this.taskRepository.findAll(userId, filters);
    }
    async getTask(id, userId) {
        const task = await this.taskRepository.findById(id, userId);
        if (!task)
            throw new Error('Task not found');
        return task;
    }
    async createTask(userId, data) {
        return this.taskRepository.create({
            ...data,
            dueDate: new Date(data.dueDate),
            userId,
        });
    }
    async updateTask(id, userId, data) {
        const updateData = { ...data };
        if (data.dueDate) {
            updateData.dueDate = new Date(data.dueDate);
        }
        const result = await this.taskRepository.update(id, userId, updateData);
        if (result.count === 0)
            throw new Error('Task not found or unauthorized');
        return this.getTask(id, userId);
    }
    async deleteTask(id, userId) {
        const result = await this.taskRepository.delete(id, userId);
        if (result.count === 0)
            throw new Error('Task not found or unauthorized');
        return { success: true };
    }
    async getDashboardSummary(userId) {
        return this.taskRepository.getSummary(userId);
    }
}
exports.TaskService = TaskService;
//# sourceMappingURL=taskService.js.map