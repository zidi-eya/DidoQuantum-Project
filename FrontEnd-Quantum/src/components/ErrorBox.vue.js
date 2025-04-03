/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
const __VLS_props = defineProps({
    errors: {
        type: Array,
        default: () => [],
    },
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
if (__VLS_ctx.errors && __VLS_ctx.errors.length) {
    const __VLS_0 = {}.QList;
    /** @type {[typeof __VLS_components.QList, typeof __VLS_components.qList, typeof __VLS_components.QList, typeof __VLS_components.qList, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        bordered: true,
    }));
    const __VLS_2 = __VLS_1({
        bordered: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_4 = {};
    __VLS_3.slots.default;
    for (const [error, index] of __VLS_getVForSourceType((__VLS_ctx.errors))) {
        const __VLS_5 = {}.QItem;
        /** @type {[typeof __VLS_components.QItem, typeof __VLS_components.qItem, typeof __VLS_components.QItem, typeof __VLS_components.qItem, ]} */ ;
        // @ts-ignore
        const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
            key: (index),
            dense: true,
        }));
        const __VLS_7 = __VLS_6({
            key: (index),
            dense: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_6));
        __VLS_8.slots.default;
        const __VLS_9 = {}.QItemSection;
        /** @type {[typeof __VLS_components.QItemSection, typeof __VLS_components.qItemSection, typeof __VLS_components.QItemSection, typeof __VLS_components.qItemSection, ]} */ ;
        // @ts-ignore
        const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({}));
        const __VLS_11 = __VLS_10({}, ...__VLS_functionalComponentArgsRest(__VLS_10));
        __VLS_12.slots.default;
        (error);
        var __VLS_12;
        var __VLS_8;
    }
    var __VLS_3;
}
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        errors: {
            type: Array,
            default: () => [],
        },
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    props: {
        errors: {
            type: Array,
            default: () => [],
        },
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=ErrorBox.vue.js.map