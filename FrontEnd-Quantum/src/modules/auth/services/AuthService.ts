import { AxiosError } from 'axios';
import { api } from '@/boot/axios';
import { NotFoundException } from '@/exceptions/http-exceptions';
import { SignInResponse } from '@/modules/auth/validation/sign-in';
import { User } from '@/modules/auth/models/user';
import { plainToInstance } from 'class-transformer';

class AuthService {
  async signInWithEmailAndPassword(
    email: string,
    password: string,
    rememberMe = false
  ): Promise<SignInResponse> {
    try {
      const response = await api.post('auth/sign-in', {
        email: email,
        password: password,
        remember_me: rememberMe,
      });

      console.log('SignIn response:', response.data);
      return response.data as SignInResponse;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error details:", error.response?.data); // Affiche les détails de l'erreur
        switch (error.response?.status) {
          case 401:
            throw new NotFoundException('Email or password is incorrect');
          case 422:
            throw new Error('Validation failed: ' + JSON.stringify(error.response?.data));
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
    password: string,
    role:string
  ): Promise<any> {
    return await api.post('auth/sign-up', {
      full_name: fullName,
      email: email,
      password: password,
      role:role,
    });
  }

  async getUser()
  : Promise<User> {
    const response = await api.get('auth/profile');
    console.log(response.data);
    const data = response.data;
    return plainToInstance(User, data, {
      excludeExtraneousValues: true,
    });
  }

  async updateProfile({ fullName }: { fullName?: string })
  : Promise<User> {
    const response = await api.patch('auth/profile', {
      ...(fullName && { full_name: fullName }),
    });
    return plainToInstance(User, response.data, {
      excludeExtraneousValues: true,
    });
  }



  async  signOut() {
    console.log('[🚪] Sign out initiated');
    try {
      await api.post('auth/sign-out');
        } catch (e) {
      console.warn('Logout failed:', e); // maybe the session is already gone
    }
  }




  async forgotPassword(email: string): Promise<void> {
    await api.post('auth/reset-password', {
      email: email,
    });
  }

  async resetPassword(token: string, password: string): Promise<void> {
    await api.post(`auth/reset-password/${token}`, {
      password: password,
    });
  }

  async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    await api.post('auth/change-password', {
      old_password: oldPassword,
      new_password: newPassword,
    });
  }
}

const authService = new AuthService();
export default authService;
