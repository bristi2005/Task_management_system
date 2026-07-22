import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { z } from 'zod';

const authService = new AuthService();

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const validatedData = registerSchema.parse(req.body);
      const result = await authService.register(
        validatedData.name,
        validatedData.email,
        validatedData.password
      );
      res.status(201).json(result);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Validation error', errors: error.issues });
      }
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const validatedData = loginSchema.parse(req.body);
      const result = await authService.login(validatedData.email, validatedData.password);
      res.status(200).json(result);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Validation error', errors: error.issues });
      }
      res.status(401).json({ message: error.message });
    }
  }

  async me(req: Request, res: Response) {
    // Assuming auth middleware attaches user to req
    res.status(200).json((req as any).user);
  }
}
