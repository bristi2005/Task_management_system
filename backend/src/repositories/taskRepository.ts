import prisma from '../config/prisma';
import { Task, Priority, Status } from '@prisma/client';

export class TaskRepository {
  async findAll(userId: string, filters: { status?: Status; priority?: Priority; search?: string }) {
    const { status, priority, search } = filters;

    return prisma.task.findMany({
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

  async findById(id: string, userId: string) {
    return prisma.task.findFirst({
      where: { id, userId },
    });
  }

  async create(data: {
    title: string;
    description?: string;
    priority: Priority;
    dueDate: Date;
    userId: string;
  }) {
    return prisma.task.create({
      data,
    });
  }

  async update(id: string, userId: string, data: Partial<Task>) {
    return prisma.task.updateMany({
      where: { id, userId },
      data,
    });
  }

  async delete(id: string, userId: string) {
    return prisma.task.deleteMany({
      where: { id, userId },
    });
  }

  async getSummary(userId: string) {
    const tasks = await prisma.task.findMany({
      where: { userId },
    });

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === Status.COMPLETED).length;
    const pending = tasks.filter(t => t.status === Status.PENDING).length;
    const inProgress = tasks.filter(t => t.status === Status.IN_PROGRESS).length;

    const now = new Date();
    const overdue = tasks.filter(t => t.status !== Status.COMPLETED && t.dueDate < now).length;

    return {
      total,
      completed,
      pending,
      inProgress,
      overdue,
    };
  }
}
