import { RouteRecordRaw } from 'vue-router';
import RoutePrefixes from '@/router/RoutePrefixes';

import authRoutes from '@/modules/auth/router/routes';

//import profileRoutes from '@/modules/profile/router/routes';
//import adminRoutes from '@/modules/admin/router/routes';
const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
    children: authRoutes[0].children, // use only the children array
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
];
/*const routes: RouteRecordRaw[] = [
  {

    path: RoutePrefixes.AUTH,
    component: () => import('@/pages/ErrorNotFound.vue'),
    children: [

     /* {
        path: RoutePrefixes.PROFILE,
        children: profileRoutes,
      },*/


    /*],
    meta: { requiresAuth: true },
  },*/

  /*{
    path: RoutePrefixes.AUTH,
    children: authRoutes,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/WelcomingMessage',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
];*/



export default routes;
