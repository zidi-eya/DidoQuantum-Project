import { z } from 'zod';

export const SignInRequest = z.object({
  username: z.string().min(1, 'Username is empty'),
  password: z.string().min(1, 'Password is empty'),
});

export type SignInResponse = {
  accessToken: string;
  refreshToken: string;
};
