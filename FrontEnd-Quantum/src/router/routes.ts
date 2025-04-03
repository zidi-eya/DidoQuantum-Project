import { RouteRecordRaw } from 'vue-router';
import RoutePrefixes from 'src/router/RoutePrefixes';

import authRoutes from 'src/modules/auth/router/routes';
//import profileRoutes from 'src/modules/profile/router/routes';
//import adminRoutes from 'src/modules/admin/router/routes';

const routes: RouteRecordRaw[] = [
  {
    path: RoutePrefixes.PROTECTED,
    component: () => import('src/modules/pages/ListUser.vue'),
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
    component: () => import('src/pages/ErrorNotFound.vue'),
  },
];

export default routes;
