import { AxiosError } from 'axios';
import { api } from 'src/boot/axios';
import { NotFoundException } from 'src/exceptions/http-exceptions';
import { User } from 'src/modules/auth/models/user';
import { plainToInstance } from 'class-transformer';
class AuthService {
    async signInWithEmailAndPassword(email, password, rememberMe = false) {
        try {
            const response = await api.post('api/auth/sign-in', {
                email: email,
                password: password,
                remember_me: rememberMe,
            });
            return response.data;
        }
        catch (error) {
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
    async signUpWithEmailAndPassword(fullName, email, password) {
        return await api.post('api/auth/sign-up', {
            full_name: fullName,
            email: email,
            password: password,
        });
    }
    async getUser() {
        const response = await api.get('api/auth/profile');
        const data = response.data;
        return plainToInstance(User, data, {
            excludeExtraneousValues: true,
        });
    }
    async updateProfile({ fullName }) {
        const response = await api.patch('api/auth/profile', {
            ...(fullName && { full_name: fullName }),
        });
        return plainToInstance(User, response.data, {
            excludeExtraneousValues: true,
        });
    }
    async signOut() {
        await api.post('api/auth/sign-out');
    }
    async forgotPassword(email) {
        await api.post('api/auth/reset-password', {
            email: email,
        });
    }
    async resetPassword(token, password) {
        await api.post(`api/auth/reset-password/${token}`, {
            password: password,
        });
    }
    async changePassword(oldPassword, newPassword) {
        await api.post('api/auth/change-password', {
            old_password: oldPassword,
            new_password: newPassword,
        });
    }
}
const authService = new AuthService();
export default authService;
//# sourceMappingURL=AuthService.js.map