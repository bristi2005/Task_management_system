import { User } from '@prisma/client';
export declare class UserRepository {
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    create(data: {
        name: string;
        email: string;
        passwordHash: string;
    }): Promise<User>;
}
//# sourceMappingURL=userRepository.d.ts.map