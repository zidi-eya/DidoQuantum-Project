import { RouteRecordRaw } from 'vue-router';
import RoutePrefixes from '@/router/RoutePrefixes';
import profileRoutes from '@/modules/profile/router/routes';
import authRoutes from '@/modules/auth/router/routes';
//import adminRoutes from '@/modules/admin/router/routes';

const routes: RouteRecordRaw[] = [
  {
    path: RoutePrefixes.PROTECTED,
    component: () => import('@/layouts/MainLayout.vue'),

    children: [
      {path: RoutePrefixes.INDEX,
      component: () => import('@/modules/pages/index.vue'),
    },

    {
      path: RoutePrefixes.PROFILE,
      children: profileRoutes,
    },

    {
      path: RoutePrefixes.ESPRIT,
      name: 'EspritPage',
      component: () => import('@/modules/pages/esprit.vue'),
    },
    {
      path: '/startup',
      component: () => import('@/modules/pages/startup.vue'),
    },
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
    path: '/about',
    name: 'about' ,
    component: () => import('@/modules/pages/about.vue'),
  },
  {
    path: '/contact',
    name: 'contact' ,
    component: () => import('@/modules/pages/contact.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
];
export default routes;




