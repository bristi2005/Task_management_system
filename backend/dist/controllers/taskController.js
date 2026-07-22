"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const taskService_1 = require("../services/taskService");
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const taskService = new taskService_1.TaskService();
const taskSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).max(100),
    description: zod_1.z.string().max(1000).optional(),
    priority: zod_1.z.nativeEnum(client_1.Priority),
    dueDate: zod_1.z.string().datetime(),
});
const updateTaskSchema = taskSchema.partial().extend({
    status: zod_1.z.nativeEnum(client_1.Status).optional(),
});
class TaskController {
    async getAll(req, res) {
        try {
            const userId = req.user.id;
            const { status, priority, search } = req.query;
            const filters = {
                status: status,
                priority: priority,
                search: search,
            };
            const tasks = await taskService.getTasks(userId, filters);
            res.json(tasks);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getOne(req, res) {
        try {
            const userId = req.user.id;
            const id = req.params['id'];
            const task = await taskService.getTask(id, userId);
            res.json(task);
        }
        catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    async create(req, res) {
        try {
            const userId = req.user.id;
            const validatedData = taskSchema.parse(req.body);
            const task = await taskService.createTask(userId, validatedData);
            res.status(201).json(task);
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({ message: 'Validation error', errors: error.issues });
            }
            res.status(400).json({ message: error.message });
        }
    }
    async update(req, res) {
        try {
            const userId = req.user.id;
            const id = req.params['id'];
            const validatedData = updateTaskSchema.parse(req.body);
            const task = await taskService.updateTask(id, userId, validatedData);
            res.json(task);
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({ message: 'Validation error', errors: error.issues });
            }
            res.status(400).json({ message: error.message });
        }
    }
    async delete(req, res) {
        try {
            const userId = req.user.id;
            const id = req.params['id'];
            await taskService.deleteTask(id, userId);
            res.status(200).json({ message: 'Task deleted successfully' });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async getSummary(req, res) {
        try {
            const userId = req.user.id;
            const summary = await taskService.getDashboardSummary(userId);
            res.json(summary);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.TaskController = TaskController;
