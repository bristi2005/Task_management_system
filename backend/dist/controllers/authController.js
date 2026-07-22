"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_1 = require("../services/authService");
const zod_1 = require("zod");
const authService = new authService_1.AuthService();
const registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
class AuthController {
    async register(req, res) {
        try {
            const validatedData = registerSchema.parse(req.body);
            const result = await authService.register(validatedData.name, validatedData.email, validatedData.password);
            res.status(201).json(result);
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({ message: 'Validation error', errors: error.issues });
            }
            res.status(400).json({ message: error.message });
        }
    }
    async login(req, res) {
        try {
            const validatedData = loginSchema.parse(req.body);
            const result = await authService.login(validatedData.email, validatedData.password);
            res.status(200).json(result);
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({ message: 'Validation error', errors: error.issues });
            }
            res.status(401).json({ message: error.message });
        }
    }
    async me(req, res) {
        // Assuming auth middleware attaches user to req
        res.status(200).json(req.user);
    }
}
exports.AuthController = AuthController;
