import { User } from '@/modules/auth/models/user';
import { api } from '@/boot/axios';
import { plainToInstance } from 'class-transformer';

class UserService {
  public async getUsers(): Promise<User[]> {
    const response = await api.get('/admin/user');
    const data = response.data;
    return plainToInstance(User, data.users, {
      excludeExtraneousValues: true,
    });
  }

  public async createUser(
    email: string,
    fullName: string,
    password: string
  ): Promise<User> {
    const response = await api.post('/admin/user', {
      email: email,
      full_name: fullName,
      password: password,
    });
    return plainToInstance(User, response.data, {
      excludeExtraneousValues: true,
    });
  }

  public async updateUser(
    userId: number,
    { isActive, fullName }: { isActive?: boolean; fullName?: string }
  ): Promise<void> {
    const response = await api.patch(`/admin/user/${userId}`, {
      ...(isActive !== undefined && { is_active: isActive }),
      ...(fullName !== undefined && { full_name: fullName }),
    });
    return plainToInstance(User, response.data, {
      excludeExtraneousValues: true,
    });
  }
}

const service = new UserService();

export default service;
