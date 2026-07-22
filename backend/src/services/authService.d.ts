export declare class AuthService {
    private userRepository;
    login(email: string, password: string): Promise<{
        token: string;
        user: {
            id: any;
            name: any;
            email: any;
        };
    }>;
    register(name: string, email: string, password: string): Promise<{
        token: string;
        user: {
            id: any;
            name: any;
            email: any;
        };
    }>;
}
//# sourceMappingURL=authService.d.ts.map