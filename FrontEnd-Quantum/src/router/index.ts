import { route } from 'quasar/wrappers';
import { createRouter, createWebHistory ,RouteRecordRaw } from 'vue-router';

//import routes from './routes';
import { useAuthStore } from '@/modules/auth/stores/auth-store';
import RoutePrefixes from '@/router/RoutePrefixes';
import { Role } from '@/modules/auth/utils/constants';
import routes from './routes';
import { LoadingBar } from 'quasar'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */



/*const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/sign-in',
    name: 'sign-in',
    component: SignInPage,
  },

  {
    path: '/:catchAll(.*)*',
    name: 'not-found',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
];*/

/*const router = createRouter({
  history: createWebHistory(),
  routes,
});*/



 //export default router;




/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = createWebHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory('/'),
  });

  Router.beforeEach(async (to) => {
    try {
    const authStore = useAuthStore();
    await authStore.reloadUser();
    LoadingBar.start();
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
  } finally {
    LoadingBar.stop();
  }
  });

  return Router;
});
