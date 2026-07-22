import { TaskRepository } from '../repositories/taskRepository';
import { Priority, Status, Task } from '@prisma/client';

export class TaskService {
  private taskRepository = new TaskRepository();

  async getTasks(userId: string, filters: { status?: Status; priority?: Priority; search?: string }) {
    return this.taskRepository.findAll(userId, filters);
  }

  async getTask(id: string, userId: string) {
    const task = await this.taskRepository.findById(id, userId);
    if (!task) throw new Error('Task not found');
    return task;
  }

  async createTask(userId: string, data: {
    title: string;
    description?: string;
    priority: Priority;
    dueDate: string;
  }) {
    return this.taskRepository.create({
      ...data,
      dueDate: new Date(data.dueDate),
      userId,
    });
  }

  async updateTask(id: string, userId: string, data: any) {
    const updateData = { ...data };
    if (data.dueDate) {
      updateData.dueDate = new Date(data.dueDate);
    }

    const result = await this.taskRepository.update(id, userId, updateData as any);
    if (result.count === 0) throw new Error('Task not found or unauthorized');
    return this.getTask(id, userId);
  }

  async deleteTask(id: string, userId: string) {
    const result = await this.taskRepository.delete(id, userId);
    if (result.count === 0) throw new Error('Task not found or unauthorized');
    return { success: true };
  }

  async getDashboardSummary(userId: string) {
    return this.taskRepository.getSummary(userId);
  }
}
