import { createRouter, createWebHistory } from 'vue-router';
import { route } from 'quasar/wrappers';
//import routes from './routes';
import RoutePrefixes from './RoutePrefixes';
//import { useAuthStore } from '..//modules/auth/stores/auth-store';
//import { Role } from '..//modules/auth/utils/constants';


import { LoadingBar } from 'quasar'
import FormulaireExample from '..//modules/pages/FormulaireExample.vue';
import Index from '..//modules/pages/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: FormulaireExample,
    },
    {
      path: '/ListUser',
      name: 'ListUser',
      component: () => import('../modules/pages/ListUser.vue'),
    },

    {
      path: '/Index',
      name: 'Index',
      component: Index,
    },

  ],
})



export default router
 /* const createHistory = createWebHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,


    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to) => {
    try {
    const authStore = useAuthStore();
    await authStore.reloadUser();
    LoadingBar.start();
    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
      return `${RoutePrefixes.AUTH}/sign-in`;
    }

    if (
      to.meta.requiresAuth &&
      authStore.isLoggedIn
    ) {
      return `${RoutePrefixes.SUBSCRIPTION}/plans`;
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
});*/










