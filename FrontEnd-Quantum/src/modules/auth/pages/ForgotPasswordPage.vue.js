import ErrorBox from '@/components/ErrorBox.vue';
import { ref } from 'vue';
import { useExceptionHandling } from '@/composables/exception-handling';
import authService from '@/modules/auth/services/AuthService';
import PageHeadings from '@/components/PageHeadings.vue';
//import AppLogo from '@/components/AppLogo.vue';
import { AuthRules } from '@/utils/validation/rules';
import RouteNames from '@/modules/auth/router/RouteNames';
import { useRouter } from 'vue-router';
const { safeExecute, errors } = useExceptionHandling();
const email = ref('');
const emailSent = ref(false);
const router = useRouter();
async function onSubmit() {
    await safeExecute(async () => {
        await authService.forgotPassword(email.value);
        emailSent.value = true;
    });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof PageHeadings, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(PageHeadings, new PageHeadings({
    title: "Forgot password",
    subtitle: "Don't remember your password? No problem, we'll sort it out!.",
}));
const __VLS_1 = __VLS_0({
    title: "Forgot password",
    subtitle: "Don't remember your password? No problem, we'll sort it out!.",
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
    modelValue: (__VLS_ctx.email),
    label: "Email",
    readonly: (__VLS_ctx.emailSent),
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.email),
    hideBottomSpace: true,
}));
const __VLS_13 = __VLS_12({
    ...{ class: "full-width" },
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.email),
    label: "Email",
    readonly: (__VLS_ctx.emailSent),
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "q-mr-sm" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.router.push({ name: __VLS_ctx.RouteNames.SIGN_IN });
        } },
    ...{ class: "text-bold text-primary cursor-pointer" },
});
if (!__VLS_ctx.emailSent) {
    const __VLS_19 = {}.QBtn;
    /** @type {[typeof __VLS_components.QBtn, typeof __VLS_components.qBtn, ]} */ ;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
        ...{ class: "q-pa-md q-my-lg full-width" },
        rounded: true,
        label: "Send email",
        type: "submit",
        color: "primary",
        iconRight: "eva-email-outline",
    }));
    const __VLS_21 = __VLS_20({
        ...{ class: "q-pa-md q-my-lg full-width" },
        rounded: true,
        label: "Send email",
        type: "submit",
        color: "primary",
        iconRight: "eva-email-outline",
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
}
else {
    const __VLS_23 = {}.QBanner;
    /** @type {[typeof __VLS_components.QBanner, typeof __VLS_components.qBanner, typeof __VLS_components.QBanner, typeof __VLS_components.qBanner, ]} */ ;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
        ...{ class: "bg-positive text-white" },
    }));
    const __VLS_25 = __VLS_24({
        ...{ class: "bg-positive text-white" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    __VLS_26.slots.default;
    {
        const { avatar: __VLS_thisSlot } = __VLS_26.slots;
        const __VLS_27 = {}.QIcon;
        /** @type {[typeof __VLS_components.QIcon, typeof __VLS_components.qIcon, ]} */ ;
        // @ts-ignore
        const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
            name: "eva-checkmark-circle-2-outline",
        }));
        const __VLS_29 = __VLS_28({
            name: "eva-checkmark-circle-2-outline",
        }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    }
    var __VLS_26;
}
/** @type {[typeof ErrorBox, ]} */ ;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(ErrorBox, new ErrorBox({
    errors: (__VLS_ctx.errors),
}));
const __VLS_32 = __VLS_31({
    errors: (__VLS_ctx.errors),
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
var __VLS_6;
/** @type {__VLS_StyleScopedClasses['q-gutter-md']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
/** @type {__VLS_StyleScopedClasses['q-mr-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['q-pa-md']} */ ;
/** @type {__VLS_StyleScopedClasses['q-my-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-positive']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ErrorBox: ErrorBox,
            PageHeadings: PageHeadings,
            AuthRules: AuthRules,
            RouteNames: RouteNames,
            errors: errors,
            email: email,
            emailSent: emailSent,
            router: router,
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
//# sourceMappingURL=ForgotPasswordPage.vue.js.map