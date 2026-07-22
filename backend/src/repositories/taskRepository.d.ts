import { Task, Priority, Status } from '@prisma/client';
export declare class TaskRepository {
    findAll(userId: string, filters: {
        status?: Status;
        priority?: Priority;
        search?: string;
    }): Promise<any>;
    findById(id: string, userId: string): Promise<any>;
    create(data: {
        title: string;
        description?: string;
        priority: Priority;
        dueDate: Date;
        userId: string;
    }): Promise<any>;
    update(id: string, userId: string, data: Partial<Task>): Promise<any>;
    delete(id: string, userId: string): Promise<any>;
    getSummary(userId: string): Promise<{
        total: any;
        completed: any;
        pending: any;
        inProgress: any;
        overdue: any;
    }>;
}
//# sourceMappingURL=taskRepository.d.ts.map