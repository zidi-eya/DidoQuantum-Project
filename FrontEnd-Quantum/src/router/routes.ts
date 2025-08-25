import { RouteRecordRaw } from 'vue-router';
import RoutePrefixes from '@/router/RoutePrefixes';
import profileRoutes from '@/modules/profile/router/routes';
import authRoutes from '@/modules/auth/router/routes';
//import adminRoutes from '@/modules/admin/router/routes';
import adminRoutes from '@/modules/admin/router/routes';

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
    path: '/upload',
    name: 'upload' ,
    component: () => import('@/modules/Upload_files/pages/CollectionOverviewPage.vue'),
  },

 {
    path: RoutePrefixes.MATCH,
    name: 'matching' ,
    component: () => import('@/modules/Matches/pages/matching.vue'),
  },
 {
    path: RoutePrefixes.COMPANY,
    name: 'company_projects' ,
    component: () => import('@/modules/Company_Project/pages/companyProject.vue')
  },
 {
    path: RoutePrefixes.RESEARCHE,
    name: 'research_profile' ,
    component: () => import('@/modules/researcher_profiles/pages/reasearchProfile.vue'),
  },
{
        path: RoutePrefixes.ADMIN,
        children: adminRoutes,
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
    {
      path: '/pilote',
      component: () => import('@/modules/pilote/pages/pilote.vue'),
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
    path: '/offer',
    name: 'offer' ,
    component: () => import('@/modules/pages/ourOffer.vue'),
  },
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




