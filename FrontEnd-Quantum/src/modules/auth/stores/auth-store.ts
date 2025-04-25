import { defineStore } from 'pinia';
import authService from '@/modules/auth/services/AuthService';
import { User } from '@/modules/auth/models/user';
import { Role } from '@/modules/auth/utils/constants';

type authState = {
  user: User | null;
};

export const useAuthStore = defineStore('auth-store', {
  state: (): authState => ({
    user: null,
  }),
  getters: {
    isLoggedIn: (state) => state.user !== null,
    isAdmin: (state) => state.user?.roles.includes(Role.SUPERADMIN),
    isTester: (state) => state.user?.roles.includes(Role.TESTER),
    getUser: (state): User => state.user!,
  },
  actions: {
    async reloadUser(onError?: (error: Error) => Promise<void>) {
      try {
        this.user = await authService.getUser();
      } catch (e) {
        if (onError) {
          onError(e as Error);
        }

        this.user = null;
      }
    },
    async updateUser({ fullName }: { fullName?: string }) {
      this.user = await authService.updateProfile({ fullName });
    },
    async signInWithEmailAndPassword(
      email: string,
      password: string,
      rememberMe: boolean,
      onError?: (error: Error) => Promise<void>
    ) {
     await authService.signInWithEmailAndPassword(email, password, rememberMe);

      await this.reloadUser(onError);
      console.log
    },
    async signOut() {
      await authService.signOut();
      localStorage.clear();
      this.user = null;
    },
  },
});
