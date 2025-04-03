/// <reference types="../../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import ErrorBox from 'src/components/ErrorBox.vue';
import { ref } from 'vue';
import { useExceptionHandling } from 'src/composables/exception-handling';
import { useRouter } from 'vue-router';
import RouteNames from 'src/modules/auth/router/RouteNames';
import PageHeadings from 'src/components/PageHeadings.vue';
import PasswordInput from 'src/components/PasswordInput.vue';
//import AppLogo from 'src/components/AppLogo.vue';
import authService from 'src/modules/auth/services/AuthService';
import { AuthRules, GeneralRules } from 'src/utils/validation/rules';
import RoutePrefixes from 'src/router/RoutePrefixes';
import { useAuthStore } from '../modules/auth/stores/auth-store';
const { safeExecute, errors } = useExceptionHandling();
const router = useRouter();
const authStore = useAuthStore();
const email = ref('');
const fullName = ref('');
const password = ref('');
const repeatPassword = ref('');
async function onSubmit() {
    safeExecute(async () => {
        await authService.signUpWithEmailAndPassword(fullName.value, email.value, password.value);
        await authStore.reloadUser();
        router.push(RoutePrefixes.PROTECTED);
    });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.AppLogo;
/** @type {[typeof __VLS_components.AppLogo, typeof __VLS_components.appLogo, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "q-mb-xl" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "q-mb-xl" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {[typeof PageHeadings, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(PageHeadings, new PageHeadings({
    title: "Sign up",
    subtitle: "You have received an invite. Create an account and let's get started!",
}));
const __VLS_5 = __VLS_4({
    title: "Sign up",
    subtitle: "You have received an invite. Create an account and let's get started!",
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
const __VLS_7 = {}.QForm;
/** @type {[typeof __VLS_components.QForm, typeof __VLS_components.qForm, typeof __VLS_components.QForm, typeof __VLS_components.qForm, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
    ...{ 'onSubmit': {} },
    greedy: true,
    ...{ class: "q-gutter-md full-width q-mb-xl" },
}));
const __VLS_9 = __VLS_8({
    ...{ 'onSubmit': {} },
    greedy: true,
    ...{ class: "q-gutter-md full-width q-mb-xl" },
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
let __VLS_11;
let __VLS_12;
let __VLS_13;
const __VLS_14 = {
    onSubmit: (__VLS_ctx.onSubmit)
};
__VLS_10.slots.default;
const __VLS_15 = {}.QInput;
/** @type {[typeof __VLS_components.QInput, typeof __VLS_components.qInput, typeof __VLS_components.QInput, typeof __VLS_components.qInput, ]} */ ;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    ...{ class: "full-width" },
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.email),
    label: "Email",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.email),
    hideBottomSpace: true,
}));
const __VLS_17 = __VLS_16({
    ...{ class: "full-width" },
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.email),
    label: "Email",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.email),
    hideBottomSpace: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
__VLS_18.slots.default;
{
    const { prepend: __VLS_thisSlot } = __VLS_18.slots;
    const __VLS_19 = {}.QIcon;
    /** @type {[typeof __VLS_components.QIcon, typeof __VLS_components.qIcon, ]} */ ;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
        name: "eva-email-outline",
    }));
    const __VLS_21 = __VLS_20({
        name: "eva-email-outline",
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
}
var __VLS_18;
const __VLS_23 = {}.QInput;
/** @type {[typeof __VLS_components.QInput, typeof __VLS_components.qInput, typeof __VLS_components.QInput, typeof __VLS_components.qInput, ]} */ ;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
    ...{ class: "full-width" },
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.fullName),
    label: "Full name",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.GeneralRules.fieldRequired('Please enter your full name')),
    hideBottomSpace: true,
}));
const __VLS_25 = __VLS_24({
    ...{ class: "full-width" },
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.fullName),
    label: "Full name",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.GeneralRules.fieldRequired('Please enter your full name')),
    hideBottomSpace: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
__VLS_26.slots.default;
{
    const { prepend: __VLS_thisSlot } = __VLS_26.slots;
    const __VLS_27 = {}.QIcon;
    /** @type {[typeof __VLS_components.QIcon, typeof __VLS_components.qIcon, ]} */ ;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
        name: "eva-person-outline",
    }));
    const __VLS_29 = __VLS_28({
        name: "eva-person-outline",
    }, ...__VLS_functionalComponentArgsRest(__VLS_28));
}
var __VLS_26;
/** @type {[typeof PasswordInput, ]} */ ;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(PasswordInput, new PasswordInput({
    ...{ class: "full-width" },
    label: "Password",
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.password),
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.passwordRequirements),
    hideBottomSpace: true,
}));
const __VLS_32 = __VLS_31({
    ...{ class: "full-width" },
    label: "Password",
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.password),
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.passwordRequirements),
    hideBottomSpace: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
/** @type {[typeof PasswordInput, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(PasswordInput, new PasswordInput({
    ...{ class: "full-width" },
    label: "Repeat password",
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.repeatPassword),
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.repeatPassword(__VLS_ctx.password)),
    hideBottomSpace: true,
}));
const __VLS_35 = __VLS_34({
    ...{ class: "full-width" },
    label: "Repeat password",
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.repeatPassword),
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.repeatPassword(__VLS_ctx.password)),
    hideBottomSpace: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
const __VLS_37 = {}.QBtn;
/** @type {[typeof __VLS_components.QBtn, typeof __VLS_components.qBtn, ]} */ ;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
    ...{ class: "q-pa-md q-my-lg full-width" },
    rounded: true,
    label: "Sign up",
    type: "submit",
    color: "primary",
    iconRight: "eva-log-in-outline",
}));
const __VLS_39 = __VLS_38({
    ...{ class: "q-pa-md q-my-lg full-width" },
    rounded: true,
    label: "Sign up",
    type: "submit",
    color: "primary",
    iconRight: "eva-log-in-outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
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
/** @type {[typeof ErrorBox, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(ErrorBox, new ErrorBox({
    errors: (__VLS_ctx.errors),
}));
const __VLS_42 = __VLS_41({
    errors: (__VLS_ctx.errors),
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
var __VLS_10;
/** @type {__VLS_StyleScopedClasses['q-mb-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['q-gutter-md']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
/** @type {__VLS_StyleScopedClasses['q-mb-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
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
            RouteNames: RouteNames,
            PageHeadings: PageHeadings,
            PasswordInput: PasswordInput,
            AuthRules: AuthRules,
            GeneralRules: GeneralRules,
            errors: errors,
            router: router,
            email: email,
            fullName: fullName,
            password: password,
            repeatPassword: repeatPassword,
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
//# sourceMappingURL=InviteSignUpPage.vue.js.map