import { RouteRecordRaw } from 'vue-router';
import RoutePrefixes from '@/router/RoutePrefixes';

import authRoutes from '@/modules/auth/router/routes';

//import profileRoutes from '@/modules/profile/router/routes';
//import adminRoutes from '@/modules/admin/router/routes';
const routes: RouteRecordRaw[] = [
  {
    path: RoutePrefixes.PROTECTED,
    component: () => import('@/layouts/MainLayout.vue'),

    children: [
      {path: RoutePrefixes.INDEX,
      component: () => import('@/modules/pages/index.vue'),
    },


    ],
    meta: { requiresAuth: true },
  },
  {
    path: '/startup',
    component: () => import('@/modules/pages/startup.vue'),
  },
  {
    path: RoutePrefixes.ESPRIT,
    component: () => import('@/modules/pages/esprit.vue'),
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




