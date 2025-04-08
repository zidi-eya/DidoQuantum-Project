import { route } from 'quasar/wrappers';
import { createRouter, createWebHistory ,RouteRecordRaw } from 'vue-router';

//import routes from './routes';
import { useAuthStore } from '@/modules/auth/stores/auth-store';
import RoutePrefixes from '@/router/RoutePrefixes';
import { Role } from '@/modules/auth/utils/constants';
import routes from './routes';
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
import HomePage from '@/modules/pages/index.vue';
import SignInPage from '@/modules/auth/pages/SignInPage.vue';


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

const router = createRouter({
  history: createWebHistory(),
  routes,
});



 export default router;
