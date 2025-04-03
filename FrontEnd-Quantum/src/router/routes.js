import RoutePrefixes from './RoutePrefixes';
import authRoutes from '@/modules/auth/router/routes';
//import profileRoutes from 'src/modules/profile/router/routes';
//import adminRoutes from 'src/modules/admin/router/routes';
const routes = [
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
//# sourceMappingURL=routes.js.map
