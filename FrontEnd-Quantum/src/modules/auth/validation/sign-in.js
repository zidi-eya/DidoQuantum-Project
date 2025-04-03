import { z } from 'zod';
export const SignInRequest = z.object({
    username: z.string().min(1, 'Username is empty'),
    password: z.string().min(1, 'Password is empty'),
});
//# sourceMappingURL=sign-in.js.map