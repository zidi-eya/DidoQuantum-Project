import ErrorBox from '@/components/ErrorBox.vue';
import { ref } from 'vue';
import { useExceptionHandling } from '@/composables/exception-handling';
import { useRoute, useRouter } from 'vue-router';
import RouteNames from '@/modules/auth/router/RouteNames';
import PasswordInput from '@/components/PasswordInput.vue';
import authService from '@/modules/auth/services/AuthService';
import PageHeadings from '@/components/PageHeadings.vue';
//import AppLogo from '@/components/AppLogo.vue';
import { AuthRules } from '@/utils/validation/rules';
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
/** @type {[typeof PageHeadings, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(PageHeadings, new PageHeadings({
    title: "Reset password",
    subtitle: "Enter your new password below",
}));
const __VLS_1 = __VLS_0({
    title: "Reset password",
    subtitle: "Enter your new password below",
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
/** @type {[typeof PasswordInput, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(PasswordInput, new PasswordInput({
    ...{ class: "full-width" },
    modelValue: (__VLS_ctx.password),
    label: "Password",
    standout: "bg-primary text-white",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.passwordRequirements),
    hideBottomSpace: true,
}));
const __VLS_12 = __VLS_11({
    ...{ class: "full-width" },
    modelValue: (__VLS_ctx.password),
    label: "Password",
    standout: "bg-primary text-white",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.passwordRequirements),
    hideBottomSpace: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
/** @type {[typeof PasswordInput, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(PasswordInput, new PasswordInput({
    ...{ class: "full-width" },
    modelValue: (__VLS_ctx.passwordConfirmation),
    label: "Password confirmation",
    standout: "bg-primary text-white",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.repeatPassword(__VLS_ctx.password)),
    hideBottomSpace: true,
}));
const __VLS_15 = __VLS_14({
    ...{ class: "full-width" },
    modelValue: (__VLS_ctx.passwordConfirmation),
    label: "Password confirmation",
    standout: "bg-primary text-white",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.repeatPassword(__VLS_ctx.password)),
    hideBottomSpace: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
if (!__VLS_ctx.passwordChanged) {
    const __VLS_17 = {}.QBtn;
    /** @type {[typeof __VLS_components.QBtn, typeof __VLS_components.qBtn, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
        ...{ class: "q-pa-md full-width" },
        rounded: true,
        label: "Reset password",
        type: "submit",
        color: "primary",
        iconRight: "eva-lock-outline",
    }));
    const __VLS_19 = __VLS_18({
        ...{ class: "q-pa-md full-width" },
        rounded: true,
        label: "Reset password",
        type: "submit",
        color: "primary",
        iconRight: "eva-lock-outline",
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "full-width" },
    });
    const __VLS_21 = {}.QBanner;
    /** @type {[typeof __VLS_components.QBanner, typeof __VLS_components.qBanner, typeof __VLS_components.QBanner, typeof __VLS_components.qBanner, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        ...{ class: "bg-positive text-white full-width" },
    }));
    const __VLS_23 = __VLS_22({
        ...{ class: "bg-positive text-white full-width" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    __VLS_24.slots.default;
    {
        const { avatar: __VLS_thisSlot } = __VLS_24.slots;
        const __VLS_25 = {}.QIcon;
        /** @type {[typeof __VLS_components.QIcon, typeof __VLS_components.qIcon, ]} */ ;
        // @ts-ignore
        const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
            name: "eva-checkmark-circle-2-outline",
        }));
        const __VLS_27 = __VLS_26({
            name: "eva-checkmark-circle-2-outline",
        }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    }
    var __VLS_24;
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
const __VLS_29 = __VLS_asFunctionalComponent(ErrorBox, new ErrorBox({
    errors: (__VLS_ctx.errors),
}));
const __VLS_30 = __VLS_29({
    errors: (__VLS_ctx.errors),
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
var __VLS_6;
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