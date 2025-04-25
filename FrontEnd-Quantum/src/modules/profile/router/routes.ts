import RouteNames from '@/modules/profile/router/RouteNames';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: RouteNames.PROFILE,
    component: () => import('@/modules/profile/pages/ProfilePage.vue'),
  },
];

export default routes;
