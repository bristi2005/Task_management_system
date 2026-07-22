import { Request, Response } from 'express';
export declare class TaskController {
    getAll(req: Request, res: Response): Promise<void>;
    getOne(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    update(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    delete(req: Request, res: Response): Promise<void>;
    getSummary(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=taskController.d.ts.map