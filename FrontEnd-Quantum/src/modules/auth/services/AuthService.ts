import { AxiosError } from 'axios';
import { api } from 'src/boot/axios';
import { NotFoundException } from 'src/exceptions/http-exceptions';
import { SignInResponse } from 'src/modules/auth/validation/sign-in';
import { User } from 'src/modules/auth/models/user';
import { plainToInstance } from 'class-transformer';

class AuthService {
  async signInWithEmailAndPassword(
    email: string,
    password: string,
    rememberMe = false
  ): Promise<SignInResponse> {
    try {
      const response = await api.post('api/auth/sign-in', {
        email: email,
        password: password,
        remember_me: rememberMe,
      });
      return response.data as SignInResponse;
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.response?.status) {
          case 401:
            throw new NotFoundException('Email or password is incorrect');
          default:
            throw error;
        }
      }

      throw error;
    }
  }

  async signUpWithEmailAndPassword(
    fullName: string,
    email: string,
    password: string
  ): Promise<any> {
    return await api.post('api/auth/sign-up', {
      full_name: fullName,
      email: email,
      password: password,
    });
  }

  async getUser(): Promise<User> {
    const response = await api.get('api/auth/profile');
    const data = response.data;
    return plainToInstance(User, data, {
      excludeExtraneousValues: true,
    });
  }

  async updateProfile({ fullName }: { fullName?: string }): Promise<User> {
    const response = await api.patch('api/auth/profile', {
      ...(fullName && { full_name: fullName }),
    });
    return plainToInstance(User, response.data, {
      excludeExtraneousValues: true,
    });
  }

  async signOut(): Promise<void> {
    await api.post('api/auth/sign-out');
  }

  async forgotPassword(email: string): Promise<void> {
    await api.post('api/auth/reset-password', {
      email: email,
    });
  }

  async resetPassword(token: string, password: string): Promise<void> {
    await api.post(`api/auth/reset-password/${token}`, {
      password: password,
    });
  }

  async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    await api.post('api/auth/change-password', {
      old_password: oldPassword,
      new_password: newPassword,
    });
  }
}

const authService = new AuthService();
export default authService;
