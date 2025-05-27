import RouteNames from '@/modules/admin/router/RouteNames';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: 'users',
    name: RouteNames.USERS_OVERVIEW,
    component: () => import('@/modules/admin/pages/UsersOverview.vue'),
  },
];

export default routes;
