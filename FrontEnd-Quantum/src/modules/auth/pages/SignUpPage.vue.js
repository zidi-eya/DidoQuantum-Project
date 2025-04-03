/// <reference types="../../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import ErrorBox from 'src/components/ErrorBox.vue';
import { ref, onMounted } from 'vue';
import { useExceptionHandling } from 'src/composables/exception-handling';
import { useRouter } from 'vue-router';
import RouteNames from 'src/modules/auth/router/RouteNames';
import PageHeadings from 'src/components/PageHeadings.vue';
import PasswordInput from 'src/components/PasswordInput.vue';
import AppLogo from 'src/components/AppLogo.vue';
import authService from 'src/modules/auth/services/AuthService';
import { AuthRules, GeneralRules } from 'src/utils/validation/rules';
import { useAuthStore } from '../modules/auth/stores/auth-store';
import stripeService from 'src/modules/stripe/services/StripeService';
const { safeExecute, errors } = useExceptionHandling();
const router = useRouter();
const step = ref(1);
const loading = ref(false);
const authStore = useAuthStore();
const email = ref('');
const fullName = ref('');
const password = ref('');
const repeatPassword = ref('');
const selectedPrice = ref();
const priceOptions = ref([]);
const userBrief = ref();
onMounted(() => {
    safeExecute(async () => {
        priceOptions.value = await stripeService.getAllPrices();
    });
});
async function onSubmit() {
    step.value = 2;
}
async function submitUserInformation() {
    if (!selectedPrice.value)
        return;
    safeExecute(async () => {
        loading.value = true;
        const response = await authService.signUpWithEmailAndPassword(fullName.value, email.value, password.value);
        await authStore.reloadUser();
        userBrief.value = response.data;
        step.value = 3;
        loading.value = false;
    });
}
async function redirectToCheckOut() {
    safeExecute(async () => {
        loading.value = true;
        await stripeService.createCheckoutSession({
            priceId: selectedPrice.value.id,
            clientReferenceId: userBrief.value.client_reference_id,
        });
        loading.value = false;
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
const __VLS_3 = {}.QStepper;
/** @type {[typeof __VLS_components.QStepper, typeof __VLS_components.qStepper, typeof __VLS_components.QStepper, typeof __VLS_components.qStepper, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3({
    headerNav: true,
    modelValue: (__VLS_ctx.step),
    vertical: true,
    color: "primary",
    animated: true,
}));
const __VLS_5 = __VLS_4({
    headerNav: true,
    modelValue: (__VLS_ctx.step),
    vertical: true,
    color: "primary",
    animated: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
__VLS_6.slots.default;
const __VLS_7 = {}.QStep;
/** @type {[typeof __VLS_components.QStep, typeof __VLS_components.qStep, typeof __VLS_components.QStep, typeof __VLS_components.qStep, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
    name: (1),
    title: "Sign up",
    icon: "settings",
    done: (__VLS_ctx.step > 1),
}));
const __VLS_9 = __VLS_8({
    name: (1),
    title: "Sign up",
    icon: "settings",
    done: (__VLS_ctx.step > 1),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
__VLS_10.slots.default;
/** @type {[typeof PageHeadings, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(PageHeadings, new PageHeadings({
    subtitle: "Let's start creating your account!",
}));
const __VLS_12 = __VLS_11({
    subtitle: "Let's start creating your account!",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
const __VLS_14 = {}.QForm;
/** @type {[typeof __VLS_components.QForm, typeof __VLS_components.qForm, typeof __VLS_components.QForm, typeof __VLS_components.qForm, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    ...{ 'onSubmit': {} },
    greedy: true,
    ...{ class: "q-gutter-md full-width" },
}));
const __VLS_16 = __VLS_15({
    ...{ 'onSubmit': {} },
    greedy: true,
    ...{ class: "q-gutter-md full-width" },
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
let __VLS_18;
let __VLS_19;
let __VLS_20;
const __VLS_21 = {
    onSubmit: (__VLS_ctx.onSubmit)
};
__VLS_17.slots.default;
const __VLS_22 = {}.QInput;
/** @type {[typeof __VLS_components.QInput, typeof __VLS_components.qInput, typeof __VLS_components.QInput, typeof __VLS_components.qInput, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    ...{ class: "full-width" },
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.email),
    label: "Email",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.email),
    hideBottomSpace: true,
}));
const __VLS_24 = __VLS_23({
    ...{ class: "full-width" },
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.email),
    label: "Email",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.email),
    hideBottomSpace: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
__VLS_25.slots.default;
{
    const { prepend: __VLS_thisSlot } = __VLS_25.slots;
    const __VLS_26 = {}.QIcon;
    /** @type {[typeof __VLS_components.QIcon, typeof __VLS_components.qIcon, ]} */ ;
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
        name: "eva-email-outline",
    }));
    const __VLS_28 = __VLS_27({
        name: "eva-email-outline",
    }, ...__VLS_functionalComponentArgsRest(__VLS_27));
}
var __VLS_25;
const __VLS_30 = {}.QInput;
/** @type {[typeof __VLS_components.QInput, typeof __VLS_components.qInput, typeof __VLS_components.QInput, typeof __VLS_components.qInput, ]} */ ;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    ...{ class: "full-width" },
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.fullName),
    label: "Full name",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.GeneralRules.fieldRequired('Please enter your full name')),
    hideBottomSpace: true,
}));
const __VLS_32 = __VLS_31({
    ...{ class: "full-width" },
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.fullName),
    label: "Full name",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.GeneralRules.fieldRequired('Please enter your full name')),
    hideBottomSpace: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
__VLS_33.slots.default;
{
    const { prepend: __VLS_thisSlot } = __VLS_33.slots;
    const __VLS_34 = {}.QIcon;
    /** @type {[typeof __VLS_components.QIcon, typeof __VLS_components.qIcon, ]} */ ;
    // @ts-ignore
    const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
        name: "eva-person-outline",
    }));
    const __VLS_36 = __VLS_35({
        name: "eva-person-outline",
    }, ...__VLS_functionalComponentArgsRest(__VLS_35));
}
var __VLS_33;
/** @type {[typeof PasswordInput, ]} */ ;
// @ts-ignore
const __VLS_38 = __VLS_asFunctionalComponent(PasswordInput, new PasswordInput({
    ...{ class: "full-width" },
    label: "Password",
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.password),
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.passwordRequirements),
    hideBottomSpace: true,
}));
const __VLS_39 = __VLS_38({
    ...{ class: "full-width" },
    label: "Password",
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.password),
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.passwordRequirements),
    hideBottomSpace: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_38));
/** @type {[typeof PasswordInput, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(PasswordInput, new PasswordInput({
    ...{ class: "full-width" },
    label: "Repeat password",
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.repeatPassword),
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.repeatPassword(__VLS_ctx.password)),
    hideBottomSpace: true,
}));
const __VLS_42 = __VLS_41({
    ...{ class: "full-width" },
    label: "Repeat password",
    standout: "bg-primary text-white",
    modelValue: (__VLS_ctx.repeatPassword),
    lazyRules: "ondemand",
    rules: (__VLS_ctx.AuthRules.repeatPassword(__VLS_ctx.password)),
    hideBottomSpace: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
const __VLS_44 = {}.QBtn;
/** @type {[typeof __VLS_components.QBtn, typeof __VLS_components.qBtn, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    ...{ class: "q-pa-md q-my-lg full-width" },
    rounded: true,
    label: "Continue",
    type: "submit",
    color: "primary",
    iconRight: "eva-arrow-downward-outline",
}));
const __VLS_46 = __VLS_45({
    ...{ class: "q-pa-md q-my-lg full-width" },
    rounded: true,
    label: "Continue",
    type: "submit",
    color: "primary",
    iconRight: "eva-arrow-downward-outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
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
var __VLS_17;
var __VLS_10;
const __VLS_48 = {}.QStep;
/** @type {[typeof __VLS_components.QStep, typeof __VLS_components.qStep, typeof __VLS_components.QStep, typeof __VLS_components.qStep, ]} */ ;
// @ts-ignore
const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
    name: (2),
    title: "Select a Subscription",
    icon: "eva-options-2-outline",
    done: (__VLS_ctx.step > 2),
}));
const __VLS_50 = __VLS_49({
    name: (2),
    title: "Select a Subscription",
    icon: "eva-options-2-outline",
    done: (__VLS_ctx.step > 2),
}, ...__VLS_functionalComponentArgsRest(__VLS_49));
__VLS_51.slots.default;
/** @type {[typeof PageHeadings, ]} */ ;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent(PageHeadings, new PageHeadings({
    subtitle: "Select the subscription that fits you better!",
}));
const __VLS_53 = __VLS_52({
    subtitle: "Select the subscription that fits you better!",
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
const __VLS_55 = {}.QSelect;
/** @type {[typeof __VLS_components.QSelect, typeof __VLS_components.qSelect, ]} */ ;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
    outlined: true,
    modelValue: (__VLS_ctx.selectedPrice),
    options: (__VLS_ctx.priceOptions),
    optionValue: "id",
    optionLabel: "name",
    label: "Subscriptions available",
}));
const __VLS_57 = __VLS_56({
    outlined: true,
    modelValue: (__VLS_ctx.selectedPrice),
    options: (__VLS_ctx.priceOptions),
    optionValue: "id",
    optionLabel: "name",
    label: "Subscriptions available",
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
const __VLS_59 = {}.QBtn;
/** @type {[typeof __VLS_components.QBtn, typeof __VLS_components.qBtn, ]} */ ;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59({
    ...{ 'onClick': {} },
    ...{ class: "q-pa-md q-my-lg full-width" },
    rounded: true,
    label: "I want this one, sign me up",
    type: "submit",
    color: "primary",
    iconRight: "eva-checkmark-outline",
    loading: (__VLS_ctx.loading),
}));
const __VLS_61 = __VLS_60({
    ...{ 'onClick': {} },
    ...{ class: "q-pa-md q-my-lg full-width" },
    rounded: true,
    label: "I want this one, sign me up",
    type: "submit",
    color: "primary",
    iconRight: "eva-checkmark-outline",
    loading: (__VLS_ctx.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_60));
let __VLS_63;
let __VLS_64;
let __VLS_65;
const __VLS_66 = {
    onClick: (__VLS_ctx.submitUserInformation)
};
var __VLS_62;
/** @type {[typeof ErrorBox, ]} */ ;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent(ErrorBox, new ErrorBox({
    errors: (__VLS_ctx.errors),
}));
const __VLS_68 = __VLS_67({
    errors: (__VLS_ctx.errors),
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
var __VLS_51;
const __VLS_70 = {}.QStep;
/** @type {[typeof __VLS_components.QStep, typeof __VLS_components.qStep, typeof __VLS_components.QStep, typeof __VLS_components.qStep, ]} */ ;
// @ts-ignore
const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({
    name: (3),
    title: "Proceed with payment",
    caption: "Please proceed with the paymnet process in order to have you onboard",
    icon: "eva-credit-card-outline",
    done: (__VLS_ctx.step > 3),
    headerNav: (__VLS_ctx.step > 3),
}));
const __VLS_72 = __VLS_71({
    name: (3),
    title: "Proceed with payment",
    caption: "Please proceed with the paymnet process in order to have you onboard",
    icon: "eva-credit-card-outline",
    done: (__VLS_ctx.step > 3),
    headerNav: (__VLS_ctx.step > 3),
}, ...__VLS_functionalComponentArgsRest(__VLS_71));
__VLS_73.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
const __VLS_74 = {}.QBtn;
/** @type {[typeof __VLS_components.QBtn, typeof __VLS_components.qBtn, ]} */ ;
// @ts-ignore
const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({
    ...{ 'onClick': {} },
    ...{ class: "q-pa-md q-my-lg full-width" },
    rounded: true,
    label: "Proceed with payment",
    color: "primary",
    iconRight: "eva-credit-card-outline",
}));
const __VLS_76 = __VLS_75({
    ...{ 'onClick': {} },
    ...{ class: "q-pa-md q-my-lg full-width" },
    rounded: true,
    label: "Proceed with payment",
    color: "primary",
    iconRight: "eva-credit-card-outline",
}, ...__VLS_functionalComponentArgsRest(__VLS_75));
let __VLS_78;
let __VLS_79;
let __VLS_80;
const __VLS_81 = {
    onClick: (__VLS_ctx.redirectToCheckOut)
};
var __VLS_77;
var __VLS_73;
var __VLS_6;
/** @type {__VLS_StyleScopedClasses['q-mb-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['q-gutter-md']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
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
/** @type {__VLS_StyleScopedClasses['q-pa-md']} */ ;
/** @type {__VLS_StyleScopedClasses['q-my-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
/** @type {__VLS_StyleScopedClasses['q-pa-md']} */ ;
/** @type {__VLS_StyleScopedClasses['q-my-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ErrorBox: ErrorBox,
            RouteNames: RouteNames,
            PageHeadings: PageHeadings,
            PasswordInput: PasswordInput,
            AppLogo: AppLogo,
            AuthRules: AuthRules,
            GeneralRules: GeneralRules,
            errors: errors,
            router: router,
            step: step,
            loading: loading,
            email: email,
            fullName: fullName,
            password: password,
            repeatPassword: repeatPassword,
            selectedPrice: selectedPrice,
            priceOptions: priceOptions,
            onSubmit: onSubmit,
            submitUserInformation: submitUserInformation,
            redirectToCheckOut: redirectToCheckOut,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=SignUpPage.vue.js.map
