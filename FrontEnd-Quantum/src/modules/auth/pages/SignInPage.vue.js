import ErrorBox from '@/components/ErrorBox.vue';
import RoutePrefixes from '@/router/RoutePrefixes';
import { ref } from 'vue';
import { SignInRequest } from '@/modules/auth/validation/sign-in';
import { useExceptionHandling } from '@/composables/exception-handling';
import { useAuthStore } from '../stores/auth-store';
import { useRouter } from 'vue-router';
import { AuthRules } from '@/utils/validation/rules';
import RouteNames from '@/modules/auth/router/RouteNames';
import PageHeadings from '@/components/PageHeadings.vue';
import PasswordInput from '@/components/PasswordInput.vue';
//import AppLogo from '@/components/AppLogo.vue';
import { AxiosError } from 'axios';
//import stripeService from '@/modules/stripe/services/StripeService';
const { safeExecute, errors } = useExceptionHandling();
const authStore = useAuthStore();
const router = useRouter();
const username = ref('');
const password = ref('');
const rememberMe = ref(false);
async function onSubmit() {
    await safeExecute(async () => {
        SignInRequest.parse({
            username: username.value,
            password: password.value,
        });
        await authStore.signInWithEmailAndPassword(username.value, password.value, rememberMe.value, async (e) => {
            if (e instanceof AxiosError) {
                if (e.response?.status === 402) {
                    const clientReferenceId = e.response?.data.client_reference_id;
                    const subscriptionId = e.response?.data.subscription_id;
                    //  if (subscriptionId) {
                    //    await stripeService.createCheckoutSession({ clientReferenceId : clientReferenceId});
                    // } else {
                    //   await router.push({
                    //     name: RouteNames.FINISH_PAYMENT,
                    //    query: { clientReferenceId },
                    //   });
                    // }
                }
            }
        });
        if (authStore.isLoggedIn) {
            await router.push(RoutePrefixes.PROTECTED);
        }
    });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof PageHeadings, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(PageHeadings, new PageHeadings({
    title: "Sign in",
    subtitle: "Enter your email and password to sign in!",
}));
const __VLS_1 = __VLS_0({
    title: "Sign in",
    subtitle: "Enter your email and password to sign in!",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
const __VLS_3 = {}.QForm;
/** @type {[typeof __VLS_components.QForm, typeof __VLS_components.qForm, typeof __VLS_components.QForm, typeof __VLS_components.qForm, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3({
    ...{ 'onSubmit': {} },
    greedy: true,
    ...{ class: "q-gutter-md full-width" },
}));
const __VLS_5 = __VLS_4({
    ...{ 'onSubmit': {} },
    greedy: true,
    ...{ class: "q-gutter-md full-width" },
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
let __VLS_7;
let __VLS_8;
let __VLS_9;
const __VLS_10 = {
    onSubmit: (__VLS_ctx.onSubmit)
};
__VLS_6.slots.default;
const __VLS_11 = {}.QInput;
/** @type {[typeof __VLS_components.QInput, typeof __VLS_components.qInput, typeof __VLS_components.QInput, typeof __VLS_components.qInput, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    ...{ class: "full-width" },
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.username),
    label: "Email",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.email),
    hideBottomSpace: true,
}));
const __VLS_13 = __VLS_12({
    ...{ class: "full-width" },
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.username),
    label: "Email",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.email),
    hideBottomSpace: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
__VLS_14.slots.default;
{
    const { prepend: __VLS_thisSlot } = __VLS_14.slots;
    const __VLS_15 = {}.QIcon;
    /** @type {[typeof __VLS_components.QIcon, typeof __VLS_components.qIcon, ]} */ ;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
        name: "eva-email-outline",
    }));
    const __VLS_17 = __VLS_16({
        name: "eva-email-outline",
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
}
var __VLS_14;
/** @type {[typeof PasswordInput, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(PasswordInput, new PasswordInput({
    ...{ class: "full-width" },
    label: "Password",
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.password),
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.passwordRequired),
    hideBottomSpace: true,
}));
const __VLS_20 = __VLS_19({
    ...{ class: "full-width" },
    label: "Password",
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.password),
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.passwordRequired),
    hideBottomSpace: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "full-width row justify-between items-center" },
});
const __VLS_22 = {}.QCheckbox;
/** @type {[typeof __VLS_components.QCheckbox, typeof __VLS_components.qCheckbox, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    modelValue: (__VLS_ctx.rememberMe),
    label: "Remember me",
}));
const __VLS_24 = __VLS_23({
    modelValue: (__VLS_ctx.rememberMe),
    label: "Remember me",
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.router.push({ name: __VLS_ctx.RouteNames.FORGOT_PASSWORD });
        } },
    ...{ class: "text-bold text-primary cursor-pointer" },
});
const __VLS_26 = {}.QBtn;
/** @type {[typeof __VLS_components.QBtn, typeof __VLS_components.qBtn, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    ...{ class: "q-pa-md q-my-lg full-width" },
    rounded: true,
    label: "Sign in",
    type: "submit",
    color: "primary",
    iconRight: "eva-log-in-outline",
}));
const __VLS_28 = __VLS_27({
    ...{ class: "q-pa-md q-my-lg full-width" },
    rounded: true,
    label: "Sign in",
    type: "submit",
    color: "primary",
    iconRight: "eva-log-in-outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "q-mr-sm" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.router.push({ name: __VLS_ctx.RouteNames.SIGN_UP });
        } },
    ...{ class: "text-bold text-primary cursor-pointer" },
});
/** @type {[typeof ErrorBox, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(ErrorBox, new ErrorBox({
    errors: (__VLS_ctx.errors),
}));
const __VLS_31 = __VLS_30({
    errors: (__VLS_ctx.errors),
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
var __VLS_6;
/** @type {__VLS_StyleScopedClasses['q-gutter-md']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['q-pa-md']} */ ;
/** @type {__VLS_StyleScopedClasses['q-my-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
/** @type {__VLS_StyleScopedClasses['q-mr-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ErrorBox: ErrorBox,
            AuthRules: AuthRules,
            RouteNames: RouteNames,
            PageHeadings: PageHeadings,
            PasswordInput: PasswordInput,
            errors: errors,
            router: router,
            username: username,
            password: password,
            rememberMe: rememberMe,
            onSubmit: onSubmit,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=SignInPage.vue.js.map