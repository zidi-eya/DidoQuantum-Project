/// <reference types="../../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { ref, onMounted } from 'vue';
import PageHeadings from 'src/components/PageHeadings.vue';
import stripeService from 'src/modules/stripe/services/StripeService';
import { useRoute } from 'vue-router';
const priceOptions = ref([]);
const selectedPrice = ref();
const route = useRoute();
const clientReferenceId = route.query.clientReferenceId;
async function proceedWithPayment() {
    const selected = selectedPrice.value;
    if (!selected) {
        return;
    }
    await stripeService.createCheckoutSession({
        priceId: selected.id,
        clientReferenceId: clientReferenceId,
    });
}
onMounted(async () => {
    priceOptions.value = await stripeService.getAllPrices();
});
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
    title: "Choose Subscription",
    subtitle: "Choose the subscription that best fits your needs.",
}));
const __VLS_5 = __VLS_4({
    title: "Choose Subscription",
    subtitle: "Choose the subscription that best fits your needs.",
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
const __VLS_7 = {}.QSelect;
/** @type {[typeof __VLS_components.QSelect, typeof __VLS_components.qSelect, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
    outlined: true,
    modelValue: (__VLS_ctx.selectedPrice),
    options: (__VLS_ctx.priceOptions),
    optionValue: "id",
    optionLabel: "name",
    label: "Subscriptions available",
}));
const __VLS_9 = __VLS_8({
    outlined: true,
    modelValue: (__VLS_ctx.selectedPrice),
    options: (__VLS_ctx.priceOptions),
    optionValue: "id",
    optionLabel: "name",
    label: "Subscriptions available",
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const __VLS_11 = {}.QBtn;
/** @type {[typeof __VLS_components.QBtn, typeof __VLS_components.qBtn, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    ...{ 'onClick': {} },
    disable: (!__VLS_ctx.selectedPrice),
    ...{ class: "q-pa-md q-my-lg full-width" },
    rounded: true,
    label: "Continue",
    color: "primary",
}));
const __VLS_13 = __VLS_12({
    ...{ 'onClick': {} },
    disable: (!__VLS_ctx.selectedPrice),
    ...{ class: "q-pa-md q-my-lg full-width" },
    rounded: true,
    label: "Continue",
    color: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
let __VLS_15;
let __VLS_16;
let __VLS_17;
const __VLS_18 = {
    onClick: (__VLS_ctx.proceedWithPayment)
};
var __VLS_14;
/** @type {__VLS_StyleScopedClasses['q-mb-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['q-pa-md']} */ ;
/** @type {__VLS_StyleScopedClasses['q-my-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            PageHeadings: PageHeadings,
            priceOptions: priceOptions,
            selectedPrice: selectedPrice,
            proceedWithPayment: proceedWithPayment,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=FinishPaymentPage.vue.js.map