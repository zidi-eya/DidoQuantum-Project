import ErrorBox from '@/components/ErrorBox.vue';
import { ref } from 'vue';
import { useExceptionHandling } from '@/composables/exception-handling';
import { useRouter } from 'vue-router';
import RouteNames from '@/modules/auth/router/RouteNames';
import PageHeadings from '@/components/PageHeadings.vue';
import PasswordInput from '@/components/PasswordInput.vue';
//import AppLogo from '@/components/AppLogo.vue';
import authService from '@/modules/auth/services/AuthService';
import { AuthRules, GeneralRules } from '@/utils/validation/rules';
import RoutePrefixes from '@/router/RoutePrefixes';
import { useAuthStore } from '@/modules/auth/stores/auth-store';
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
/** @type {[typeof PageHeadings, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(PageHeadings, new PageHeadings({
    title: "Sign up",
    subtitle: "You have received an invite. Create an account and let's get started!",
}));
const __VLS_1 = __VLS_0({
    title: "Sign up",
    subtitle: "You have received an invite. Create an account and let's get started!",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
const __VLS_3 = {}.QForm;
/** @type {[typeof __VLS_components.QForm, typeof __VLS_components.qForm, typeof __VLS_components.QForm, typeof __VLS_components.qForm, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3({
    ...{ 'onSubmit': {} },
    greedy: true,
    ...{ class: "q-gutter-md full-width q-mb-xl" },
}));
const __VLS_5 = __VLS_4({
    ...{ 'onSubmit': {} },
    greedy: true,
    ...{ class: "q-gutter-md full-width q-mb-xl" },
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
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.email),
    hideBottomSpace: true,
}));
const __VLS_13 = __VLS_12({
    ...{ class: "full-width" },
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.email),
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
const __VLS_19 = {}.QInput;
/** @type {[typeof __VLS_components.QInput, typeof __VLS_components.qInput, typeof __VLS_components.QInput, typeof __VLS_components.qInput, ]} */ ;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
    ...{ class: "full-width" },
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.fullName),
    label: "Full name",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.GeneralRules.fieldRequired('Please enter your full name')),
    hideBottomSpace: true,
}));
const __VLS_21 = __VLS_20({
    ...{ class: "full-width" },
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.fullName),
    label: "Full name",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.GeneralRules.fieldRequired('Please enter your full name')),
    hideBottomSpace: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
__VLS_22.slots.default;
{
    const { prepend: __VLS_thisSlot } = __VLS_22.slots;
    const __VLS_23 = {}.QIcon;
    /** @type {[typeof __VLS_components.QIcon, typeof __VLS_components.qIcon, ]} */ ;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
        name: "eva-person-outline",
    }));
    const __VLS_25 = __VLS_24({
        name: "eva-person-outline",
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
}
var __VLS_22;
/** @type {[typeof PasswordInput, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(PasswordInput, new PasswordInput({
    ...{ class: "full-width" },
    label: "Password",
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.password),
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.passwordRequirements),
    hideBottomSpace: true,
}));
const __VLS_28 = __VLS_27({
    ...{ class: "full-width" },
    label: "Password",
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.password),
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.passwordRequirements),
    hideBottomSpace: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
/** @type {[typeof PasswordInput, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(PasswordInput, new PasswordInput({
    ...{ class: "full-width" },
    label: "Repeat password",
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.repeatPassword),
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.repeatPassword(__VLS_ctx.password)),
    hideBottomSpace: true,
}));
const __VLS_31 = __VLS_30({
    ...{ class: "full-width" },
    label: "Repeat password",
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.repeatPassword),
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.repeatPassword(__VLS_ctx.password)),
    hideBottomSpace: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
const __VLS_33 = {}.QBtn;
/** @type {[typeof __VLS_components.QBtn, typeof __VLS_components.qBtn, ]} */ ;
// @ts-ignore
const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
    ...{ class: "q-pa-md q-my-lg full-width" },
    rounded: true,
    label: "Sign up",
    type: "submit",
    color: "primary",
    iconRight: "eva-log-in-outline",
}));
const __VLS_35 = __VLS_34({
    ...{ class: "q-pa-md q-my-lg full-width" },
    rounded: true,
    label: "Sign up",
    type: "submit",
    color: "primary",
    iconRight: "eva-log-in-outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_34));
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
const __VLS_37 = __VLS_asFunctionalComponent(ErrorBox, new ErrorBox({
    errors: (__VLS_ctx.errors),
}));
const __VLS_38 = __VLS_37({
    errors: (__VLS_ctx.errors),
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
var __VLS_6;
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