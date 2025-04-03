import { defineStore } from 'pinia';
import authService from 'src/modules/auth/services/AuthService';
import { Role } from 'src/modules/auth/utils/constants';
export const useAuthStore = defineStore('auth-store', {
    state: () => ({
        user: null,
    }),
    getters: {
        isLoggedIn: (state) => state.user !== null,
        isAdmin: (state) => state.user?.roles.includes(Role.SUPERADMIN),
        isTester: (state) => state.user?.roles.includes(Role.TESTER),
        getUser: (state) => state.user,
    },
    actions: {
        async reloadUser(onError) {
            try {
                this.user = await authService.getUser();
            }
            catch (e) {
                if (onError) {
                    onError(e);
                }
                this.user = null;
            }
        },
        async updateUser({ fullName }) {
            this.user = await authService.updateProfile({ fullName });
        },
        async signInWithEmailAndPassword(email, password, rememberMe, onError) {
            await authService.signInWithEmailAndPassword(email, password, rememberMe);
            await this.reloadUser(onError);
        },
        async signOut() {
            await authService.signOut();
            this.user = null;
        },
    },
});
//# sourceMappingURL=auth-store.js.map