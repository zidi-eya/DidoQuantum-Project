import { ref, onMounted } from 'vue';
import { User } from '@/modules/auth/models/user';
import userService from '@/modules/admin/services/UserService';

export function useUsers() {
  const users = ref<User[]>([]);
  const isLoading = ref<boolean>(true);

  onMounted(async () => {
    users.value = await userService.getUsers();
    isLoading.value = false;
  });

  return { users, isLoading };
}
