import { Priority, Status, Task } from '@prisma/client';
export declare class TaskService {
    private taskRepository;
    getTasks(userId: string, filters: {
        status?: Status;
        priority?: Priority;
        search?: string;
    }): Promise<any>;
    getTask(id: string, userId: string): Promise<any>;
    createTask(userId: string, data: {
        title: string;
        description?: string;
        priority: Priority;
        dueDate: string;
    }): Promise<any>;
    updateTask(id: string, userId: string, data: Partial<Task> & {
        dueDate?: string;
    }): Promise<any>;
    deleteTask(id: string, userId: string): Promise<{
        success: boolean;
    }>;
    getDashboardSummary(userId: string): Promise<{
        total: any;
        completed: any;
        pending: any;
        inProgress: any;
        overdue: any;
    }>;
}
//# sourceMappingURL=taskService.d.ts.map