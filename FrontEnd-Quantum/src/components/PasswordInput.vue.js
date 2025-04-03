/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { ref, watch } from 'vue';
const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
});
const emit = defineEmits(['update:modelValue']);
const password = ref(props.modelValue);
const isHidden = ref(true);
watch(password, (newValue) => {
    emit('update:modelValue', newValue);
});
watch(() => props.modelValue, (newValue) => {
    if (newValue !== password.value) {
        password.value = newValue;
    }
});
const toggleVisibility = () => {
    isHidden.value = !isHidden.value;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.QInput;
/** @type {[typeof __VLS_components.QInput, typeof __VLS_components.qInput, typeof __VLS_components.QInput, typeof __VLS_components.qInput, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.password),
    type: (__VLS_ctx.isHidden ? 'password' : 'text'),
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.password),
    type: (__VLS_ctx.isHidden ? 'password' : 'text'),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
{
    const { prepend: __VLS_thisSlot } = __VLS_3.slots;
    const __VLS_5 = {}.QIcon;
    /** @type {[typeof __VLS_components.QIcon, typeof __VLS_components.qIcon, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        name: "eva-lock-outline",
    }));
    const __VLS_7 = __VLS_6({
        name: "eva-lock-outline",
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
}
{
    const { append: __VLS_thisSlot } = __VLS_3.slots;
    const __VLS_9 = {}.QIcon;
    /** @type {[typeof __VLS_components.QIcon, typeof __VLS_components.qIcon, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
        ...{ 'onClick': {} },
        name: (__VLS_ctx.isHidden ? 'eva-eye-outline' : 'eva-eye-off-2-outline'),
        ...{ class: "cursor-pointer" },
    }));
    const __VLS_11 = __VLS_10({
        ...{ 'onClick': {} },
        name: (__VLS_ctx.isHidden ? 'eva-eye-outline' : 'eva-eye-off-2-outline'),
        ...{ class: "cursor-pointer" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    let __VLS_13;
    let __VLS_14;
    let __VLS_15;
    const __VLS_16 = {
        onClick: (__VLS_ctx.toggleVisibility)
    };
    var __VLS_12;
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
[__VLS_dollars.$attrs,];
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            password: password,
            isHidden: isHidden,
            toggleVisibility: toggleVisibility,
        };
    },
    emits: {},
    props: {
        modelValue: {
            type: String,
            required: true,
        },
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    props: {
        modelValue: {
            type: String,
            required: true,
        },
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=PasswordInput.vue.js.map