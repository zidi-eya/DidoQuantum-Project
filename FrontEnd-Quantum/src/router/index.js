import { route } from 'quasar/wrappers';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import { useAuthStore } from '@/modules/auth/stores/auth-store';
import RoutePrefixes from './RoutePrefixes';
import { Role } from '@/modules/auth/utils/constants';
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
export default route(function ( /* { store, ssrContext } */) {
    const createHistory = createWebHistory;
    const Router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes,
        // Leave this as is and make changes in quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        history: createHistory(process.env.VUE_ROUTER_BASE),
    });
    Router.beforeEach(async (to) => {
        const authStore = useAuthStore();
        await authStore.reloadUser();
        if (to.meta.requiresAuth && !authStore.isLoggedIn) {
            return `${RoutePrefixes.AUTH}/sign-in`;
        }
        if (to.path.includes(RoutePrefixes.AUTH) && authStore.isLoggedIn) {
            return RoutePrefixes.PROTECTED;
        }
        if (to.path.includes(RoutePrefixes.ADMIN) && authStore.isLoggedIn) {
            if (!authStore.getUser.roles.includes(Role.SUPERADMIN)) {
                return RoutePrefixes.PROTECTED;
            }
        }
    });
    return Router;
});
//# sourceMappingURL=index.js.map
