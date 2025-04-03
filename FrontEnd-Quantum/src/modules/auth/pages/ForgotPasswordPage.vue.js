/// <reference types="../../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import ErrorBox from 'src/components/ErrorBox.vue';
import { ref } from 'vue';
import { useExceptionHandling } from 'src/composables/exception-handling';
import authService from 'src/modules/auth/services/AuthService';
import PageHeadings from 'src/components/PageHeadings.vue';
import AppLogo from 'src/components/AppLogo.vue';
import { AuthRules } from 'src/utils/validation/rules';
import RouteNames from 'src/modules/auth/router/RouteNames';
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
/** @type {[typeof AppLogo, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(AppLogo, new AppLogo({
    ...{ class: "q-mb-xl" },
}));
const __VLS_1 = __VLS_0({
    ...{ class: "q-mb-xl" },
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
/** @type {[typeof PageHeadings, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(PageHeadings, new PageHeadings({
    title: "Forgot password",
    subtitle: "Don't remember your password? No problem, we'll sort it out!.",
}));
const __VLS_4 = __VLS_3({
    title: "Forgot password",
    subtitle: "Don't remember your password? No problem, we'll sort it out!.",
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
const __VLS_6 = {}.QForm;
/** @type {[typeof __VLS_components.QForm, typeof __VLS_components.qForm, typeof __VLS_components.QForm, typeof __VLS_components.qForm, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    ...{ 'onSubmit': {} },
    greedy: true,
    ...{ class: "q-gutter-md full-width" },
}));
const __VLS_8 = __VLS_7({
    ...{ 'onSubmit': {} },
    greedy: true,
    ...{ class: "q-gutter-md full-width" },
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
let __VLS_10;
let __VLS_11;
let __VLS_12;
const __VLS_13 = {
    onSubmit: (__VLS_ctx.onSubmit)
};
__VLS_9.slots.default;
const __VLS_14 = {}.QInput;
/** @type {[typeof __VLS_components.QInput, typeof __VLS_components.qInput, typeof __VLS_components.QInput, typeof __VLS_components.qInput, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    ...{ class: "full-width" },
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.email),
    label: "Email",
    readonly: (__VLS_ctx.emailSent),
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.email),
    hideBottomSpace: true,
}));
const __VLS_16 = __VLS_15({
    ...{ class: "full-width" },
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.email),
    label: "Email",
    readonly: (__VLS_ctx.emailSent),
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.email),
    hideBottomSpace: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
__VLS_17.slots.default;
{
    const { prepend: __VLS_thisSlot } = __VLS_17.slots;
    const __VLS_18 = {}.QIcon;
    /** @type {[typeof __VLS_components.QIcon, typeof __VLS_components.qIcon, ]} */ ;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
        name: "eva-email-outline",
    }));
    const __VLS_20 = __VLS_19({
        name: "eva-email-outline",
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
}
var __VLS_17;
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
    const __VLS_22 = {}.QBtn;
    /** @type {[typeof __VLS_components.QBtn, typeof __VLS_components.qBtn, ]} */ ;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
        ...{ class: "q-pa-md q-my-lg full-width" },
        rounded: true,
        label: "Send email",
        type: "submit",
        color: "primary",
        iconRight: "eva-email-outline",
    }));
    const __VLS_24 = __VLS_23({
        ...{ class: "q-pa-md q-my-lg full-width" },
        rounded: true,
        label: "Send email",
        type: "submit",
        color: "primary",
        iconRight: "eva-email-outline",
    }, ...__VLS_functionalComponentArgsRest(__VLS_23));
}
else {
    const __VLS_26 = {}.QBanner;
    /** @type {[typeof __VLS_components.QBanner, typeof __VLS_components.qBanner, typeof __VLS_components.QBanner, typeof __VLS_components.qBanner, ]} */ ;
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
        ...{ class: "bg-positive text-white" },
    }));
    const __VLS_28 = __VLS_27({
        ...{ class: "bg-positive text-white" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    __VLS_29.slots.default;
    {
        const { avatar: __VLS_thisSlot } = __VLS_29.slots;
        const __VLS_30 = {}.QIcon;
        /** @type {[typeof __VLS_components.QIcon, typeof __VLS_components.qIcon, ]} */ ;
        // @ts-ignore
        const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
            name: "eva-checkmark-circle-2-outline",
        }));
        const __VLS_32 = __VLS_31({
            name: "eva-checkmark-circle-2-outline",
        }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    }
    var __VLS_29;
}
/** @type {[typeof ErrorBox, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(ErrorBox, new ErrorBox({
    errors: (__VLS_ctx.errors),
}));
const __VLS_35 = __VLS_34({
    errors: (__VLS_ctx.errors),
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
var __VLS_9;
/** @type {__VLS_StyleScopedClasses['q-mb-xl']} */ ;
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
            AppLogo: AppLogo,
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