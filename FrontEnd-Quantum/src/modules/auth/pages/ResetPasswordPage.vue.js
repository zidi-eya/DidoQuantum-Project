/// <reference types="../../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import ErrorBox from 'src/components/ErrorBox.vue';
import { ref } from 'vue';
import { useExceptionHandling } from 'src/composables/exception-handling';
import { useRoute, useRouter } from 'vue-router';
import RouteNames from 'src/modules/auth/router/RouteNames';
import PasswordInput from 'src/components/PasswordInput.vue';
import authService from 'src/modules/auth/services/AuthService';
import PageHeadings from 'src/components/PageHeadings.vue';
import AppLogo from 'src/components/AppLogo.vue';
import { AuthRules } from 'src/utils/validation/rules';
const { safeExecute, errors } = useExceptionHandling();
const route = useRoute();
const router = useRouter();
const token = route.query.token;
const password = ref('');
const passwordConfirmation = ref('');
const passwordChanged = ref(false);
async function onSubmit() {
    await safeExecute(async () => {
        await authService.resetPassword(token, password.value);
        passwordChanged.value = true;
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
    title: "Reset password",
    subtitle: "Enter your new password below",
}));
const __VLS_4 = __VLS_3({
    title: "Reset password",
    subtitle: "Enter your new password below",
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
/** @type {[typeof PasswordInput, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(PasswordInput, new PasswordInput({
    ...{ class: "full-width" },
    modelValue: (__VLS_ctx.password),
    label: "Password",
    standout: "bg-primary text-white",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.passwordRequirements),
    hideBottomSpace: true,
}));
const __VLS_15 = __VLS_14({
    ...{ class: "full-width" },
    modelValue: (__VLS_ctx.password),
    label: "Password",
    standout: "bg-primary text-white",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.passwordRequirements),
    hideBottomSpace: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
/** @type {[typeof PasswordInput, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(PasswordInput, new PasswordInput({
    ...{ class: "full-width" },
    modelValue: (__VLS_ctx.passwordConfirmation),
    label: "Password confirmation",
    standout: "bg-primary text-white",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.repeatPassword(__VLS_ctx.password)),
    hideBottomSpace: true,
}));
const __VLS_18 = __VLS_17({
    ...{ class: "full-width" },
    modelValue: (__VLS_ctx.passwordConfirmation),
    label: "Password confirmation",
    standout: "bg-primary text-white",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.repeatPassword(__VLS_ctx.password)),
    hideBottomSpace: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
if (!__VLS_ctx.passwordChanged) {
    const __VLS_20 = {}.QBtn;
    /** @type {[typeof __VLS_components.QBtn, typeof __VLS_components.qBtn, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        ...{ class: "q-pa-md full-width" },
        rounded: true,
        label: "Reset password",
        type: "submit",
        color: "primary",
        iconRight: "eva-lock-outline",
    }));
    const __VLS_22 = __VLS_21({
        ...{ class: "q-pa-md full-width" },
        rounded: true,
        label: "Reset password",
        type: "submit",
        color: "primary",
        iconRight: "eva-lock-outline",
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "full-width" },
    });
    const __VLS_24 = {}.QBanner;
    /** @type {[typeof __VLS_components.QBanner, typeof __VLS_components.qBanner, typeof __VLS_components.QBanner, typeof __VLS_components.qBanner, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        ...{ class: "bg-positive text-white full-width" },
    }));
    const __VLS_26 = __VLS_25({
        ...{ class: "bg-positive text-white full-width" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    __VLS_27.slots.default;
    {
        const { avatar: __VLS_thisSlot } = __VLS_27.slots;
        const __VLS_28 = {}.QIcon;
        /** @type {[typeof __VLS_components.QIcon, typeof __VLS_components.qIcon, ]} */ ;
        // @ts-ignore
        const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
            name: "eva-checkmark-circle-2-outline",
        }));
        const __VLS_30 = __VLS_29({
            name: "eva-checkmark-circle-2-outline",
        }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    }
    var __VLS_27;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "q-mt-md" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ onClick: (...[$event]) => {
                if (!!(!__VLS_ctx.passwordChanged))
                    return;
                __VLS_ctx.router.push({ name: __VLS_ctx.RouteNames.SIGN_IN });
            } },
        ...{ class: "text-bold text-primary cursor-pointer" },
    });
}
/** @type {[typeof ErrorBox, ]} */ ;
// @ts-ignore
const __VLS_32 = __VLS_asFunctionalComponent(ErrorBox, new ErrorBox({
    errors: (__VLS_ctx.errors),
}));
const __VLS_33 = __VLS_32({
    errors: (__VLS_ctx.errors),
}, ...__VLS_functionalComponentArgsRest(__VLS_32));
var __VLS_9;
/** @type {__VLS_StyleScopedClasses['q-mb-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['q-gutter-md']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
/** @type {__VLS_StyleScopedClasses['q-pa-md']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-positive']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
/** @type {__VLS_StyleScopedClasses['q-mt-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ErrorBox: ErrorBox,
            RouteNames: RouteNames,
            PasswordInput: PasswordInput,
            PageHeadings: PageHeadings,
            AppLogo: AppLogo,
            AuthRules: AuthRules,
            errors: errors,
            router: router,
            password: password,
            passwordConfirmation: passwordConfirmation,
            passwordChanged: passwordChanged,
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
//# sourceMappingURL=ResetPasswordPage.vue.js.map