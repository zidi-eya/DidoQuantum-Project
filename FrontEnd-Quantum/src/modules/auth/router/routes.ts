import RouteNames from '@/modules/auth/router/RouteNames';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        redirect: { name: RouteNames.SIGN_IN },
      },
      {
        name: RouteNames.SIGN_IN,
        path: 'sign-in',
        component: () => import('@/modules/auth/pages/SignInPage.vue'),
      },
      {
        name: RouteNames.SIGN_UP,
        path: 'sign-up',
        component: () => import('@/modules/auth/pages/SignUpPage.vue'),
      },
      {
        name: RouteNames.FORGOT_PASSWORD,
        path: 'forgot-password',
        component: () =>
          import('@/modules/auth/pages/ForgotPasswordPage.vue'),
      },
      {
        name: RouteNames.RESET_PASSWORD,
        path: 'reset-password',
        component: () => import('@/modules/auth/pages/ResetPasswordPage.vue'),
      },
      {
        name: RouteNames.FINISH_PAYMENT,
        path: 'finish-payment',
        component: () => import('@/modules/auth/pages/FinishPaymentPage.vue'),
      },
      {
        name: RouteNames.INVITE_SIGN_UP,
        path: 'invite-sign-up',
        component: () => import('@/modules/auth/pages/InviteSignUpPage.vue'),
      },
    ],
  },
];

export default routes;
