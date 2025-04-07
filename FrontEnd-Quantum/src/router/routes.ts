import { RouteRecordRaw } from 'vue-router';
import RoutePrefixes from '@/router/RoutePrefixes';

import authRoutes from '@/modules/auth/router/routes';
//import profileRoutes from '@/modules/profile/router/routes';
//import adminRoutes from '@/modules/admin/router/routes';

const routes: RouteRecordRaw[] = [
  {
    path: RoutePrefixes.PROTECTED,
    component: () => import('@/modules/pages/ListUser.vue'),
    children: [

     /* {
        path: RoutePrefixes.PROFILE,
        children: profileRoutes,
      },*/


    ],
    meta: { requiresAuth: true },
  },

  {
    path: RoutePrefixes.AUTH,
    children: authRoutes,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
];

export default routes;
