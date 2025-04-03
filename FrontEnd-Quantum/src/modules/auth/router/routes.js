import RouteNames from 'src/modules/auth/router/RouteNames';
const routes = [
    {
        path: '',
        component: () => import('src/modules/auth/layouts/AuthLayout.vue'),
        children: [
            {
                path: '',
                redirect: { name: RouteNames.SIGN_IN },
            },
            {
                name: RouteNames.SIGN_IN,
                path: 'sign-in',
                component: () => import('src/modules/auth/pages/SignInPage.vue'),
            },
            {
                name: RouteNames.SIGN_UP,
                path: 'sign-up',
                component: () => import('src/modules/auth/pages/SignUpPage.vue'),
            },
            {
                name: RouteNames.FORGOT_PASSWORD,
                path: 'forgot-password',
                component: () => import('src/modules/auth/pages/ForgotPasswordPage.vue'),
            },
            {
                name: RouteNames.RESET_PASSWORD,
                path: 'reset-password',
                component: () => import('src/modules/auth/pages/ResetPasswordPage.vue'),
            },
            {
                name: RouteNames.FINISH_PAYMENT,
                path: 'finish-payment',
                component: () => import('src/modules/auth/pages/FinishPaymentPage.vue'),
            },
            {
                name: RouteNames.INVITE_SIGN_UP,
                path: 'invite-sign-up',
                component: () => import('src/modules/auth/pages/InviteSignUpPage.vue'),
            },
        ],
    },
];
export default routes;
//# sourceMappingURL=routes.js.map
