import { Request, Response } from 'express';
import { TaskService } from '../services/taskService';
import { z } from 'zod';
import { Priority, Status } from '@prisma/client';

const taskService = new TaskService();

const taskSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().max(1000).optional(),
  priority: z.nativeEnum(Priority),
  dueDate: z.string().datetime(),
});

const updateTaskSchema = taskSchema.partial().extend({
  status: z.nativeEnum(Status).optional(),
});

export class TaskController {
  async getAll(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const { status, priority, search } = req.query;
      const filters = {
        status: status as Status,
        priority: priority as Priority,
        search: search as string,
      };
      const tasks = await taskService.getTasks(userId, filters);
      res.json(tasks);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const id = req.params['id'] as string;
      const task = await taskService.getTask(id, userId);
      res.json(task);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const validatedData = taskSchema.parse(req.body);
      const task = await taskService.createTask(userId, validatedData);
      res.status(201).json(task);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Validation error', errors: error.issues });
      }
      res.status(400).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const id = req.params['id'] as string;
      const validatedData = updateTaskSchema.parse(req.body);
      const task = await taskService.updateTask(id, userId, validatedData);
      res.json(task);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Validation error', errors: error.issues });
      }
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const id = req.params['id'] as string;
      await taskService.deleteTask(id, userId);
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getSummary(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      const summary = await taskService.getDashboardSummary(userId);
      res.json(summary);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
