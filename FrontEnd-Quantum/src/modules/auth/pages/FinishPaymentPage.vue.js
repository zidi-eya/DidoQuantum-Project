import PageHeadings from '@/components/PageHeadings.vue';
///import stripeService from 'src/modules/stripe/services/StripeService';
//import { Price } from 'src/modules/stripe/models/price';
import { useRoute } from 'vue-router';
//const priceOptions = ref<Price[]>([]);
//const selectedPrice = ref<Price>();
const route = useRoute();
const clientReferenceId = route.query.clientReferenceId;
/*async function proceedWithPayment() {
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
});*/
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {[typeof PageHeadings, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(PageHeadings, new PageHeadings({
    title: "Choose Subscription",
    subtitle: "Choose the subscription that best fits your needs.",
}));
const __VLS_1 = __VLS_0({
    title: "Choose Subscription",
    subtitle: "Choose the subscription that best fits your needs.",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
const __VLS_3 = {}.QBtn;
/** @type {[typeof __VLS_components.QBtn, typeof __VLS_components.qBtn, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3({
    ...{ class: "q-pa-md q-my-lg full-width" },
    rounded: true,
    label: "Continue",
    color: "primary",
}));
const __VLS_5 = __VLS_4({
    ...{ class: "q-pa-md q-my-lg full-width" },
    rounded: true,
    label: "Continue",
    color: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
/** @type {__VLS_StyleScopedClasses['q-pa-md']} */ ;
/** @type {__VLS_StyleScopedClasses['q-my-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            PageHeadings: PageHeadings,
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