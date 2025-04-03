/// <reference types="../../../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { ref, watch } from 'vue';
import apiService from 'src/modules/auth/services/ApiService';
import DatePickerInput from 'src/components/DatePickerInput.vue';
import CollectionPicker from 'src/modules/knowledge-base/components/CollectionPicker.vue';
import { GeneralRules } from 'src/utils/validation/rules';
const props = defineProps({
    modelValue: Boolean,
    promptValue: Boolean,
});
const emit = defineEmits();
const isVisible = ref(false);
const name = ref('');
const date = ref();
const prompt = ref(false);
const allCollections = ref(true);
const collectionsIds = ref();
function close() {
    isVisible.value = false;
    name.value = '';
    date.value = undefined;
    prompt.value = false;
    allCollections.value = true;
    collectionsIds.value = undefined;
}
async function create() {
    const apiKey = await apiService.createAPIKey(name.value, props.promptValue ?? prompt.value, allCollections.value ? undefined : collectionsIds.value, date.value);
    emit('create', apiKey);
    close();
}
watch(() => props.modelValue, (newVal) => {
    isVisible.value = newVal;
});
watch(isVisible, (newVal) => {
    emit('update:modelValue', newVal);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.QDialog;
/** @type {[typeof __VLS_components.QDialog, typeof __VLS_components.qDialog, typeof __VLS_components.QDialog, typeof __VLS_components.qDialog, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.isVisible),
    persistent: true,
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.isVisible),
    persistent: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = {}.QCard;
/** @type {[typeof __VLS_components.QCard, typeof __VLS_components.qCard, typeof __VLS_components.QCard, typeof __VLS_components.qCard, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    ...{ class: "collection-picker rounded-sm q-pa-md column full-width" },
    ...{ style: {} },
}));
const __VLS_7 = __VLS_6({
    ...{ class: "collection-picker rounded-sm q-pa-md column full-width" },
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
const __VLS_9 = {}.QCardSection;
/** @type {[typeof __VLS_components.QCardSection, typeof __VLS_components.qCardSection, typeof __VLS_components.QCardSection, typeof __VLS_components.qCardSection, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({}));
const __VLS_11 = __VLS_10({}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-h6 text-center" },
});
var __VLS_12;
const __VLS_13 = {}.QCardSection;
/** @type {[typeof __VLS_components.QCardSection, typeof __VLS_components.qCardSection, typeof __VLS_components.QCardSection, typeof __VLS_components.qCardSection, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    ...{ class: "q-pt-none col-grow column q-gutter-sm" },
}));
const __VLS_15 = __VLS_14({
    ...{ class: "q-pt-none col-grow column q-gutter-sm" },
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_16.slots.default;
const __VLS_17 = {}.QForm;
/** @type {[typeof __VLS_components.QForm, typeof __VLS_components.qForm, typeof __VLS_components.QForm, typeof __VLS_components.qForm, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    ...{ 'onSubmit': {} },
    greedy: true,
    id: "create-api-key-form",
    ...{ class: "column q-gutter-md" },
}));
const __VLS_19 = __VLS_18({
    ...{ 'onSubmit': {} },
    greedy: true,
    id: "create-api-key-form",
    ...{ class: "column q-gutter-md" },
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
let __VLS_21;
let __VLS_22;
let __VLS_23;
const __VLS_24 = {
    onSubmit: (__VLS_ctx.create)
};
__VLS_20.slots.default;
const __VLS_25 = {}.QInput;
/** @type {[typeof __VLS_components.QInput, typeof __VLS_components.qInput, typeof __VLS_components.QInput, typeof __VLS_components.qInput, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    modelValue: (__VLS_ctx.name),
    label: "Name",
    dense: true,
    outlined: true,
    color: "primary",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.GeneralRules.fieldRequired('Please enter a name for the API key')),
    hideBottomSpace: true,
}));
const __VLS_27 = __VLS_26({
    modelValue: (__VLS_ctx.name),
    label: "Name",
    dense: true,
    outlined: true,
    color: "primary",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.GeneralRules.fieldRequired('Please enter a name for the API key')),
    hideBottomSpace: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
__VLS_28.slots.default;
{
    const { prepend: __VLS_thisSlot } = __VLS_28.slots;
    const __VLS_29 = {}.QIcon;
    /** @type {[typeof __VLS_components.QIcon, typeof __VLS_components.qIcon, ]} */ ;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
        name: "eva-text-outline",
    }));
    const __VLS_31 = __VLS_30({
        name: "eva-text-outline",
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
}
var __VLS_28;
/** @type {[typeof DatePickerInput, ]} */ ;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent(DatePickerInput, new DatePickerInput({
    modelValue: (__VLS_ctx.date),
    dense: true,
    outlined: true,
    color: "primary",
    label: "Expiration Date",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.GeneralRules.optionalField(__VLS_ctx.GeneralRules.date)),
    hideBottomSpace: true,
}));
const __VLS_34 = __VLS_33({
    modelValue: (__VLS_ctx.date),
    dense: true,
    outlined: true,
    color: "primary",
    label: "Expiration Date",
    lazyRules: "ondemand",
    rules: (__VLS_ctx.GeneralRules.optionalField(__VLS_ctx.GeneralRules.date)),
    hideBottomSpace: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
var __VLS_20;
if (__VLS_ctx.promptValue === undefined) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "text-caption" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "row" },
    });
    const __VLS_36 = {}.QCheckbox;
    /** @type {[typeof __VLS_components.QCheckbox, typeof __VLS_components.qCheckbox, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
        modelValue: (__VLS_ctx.prompt),
        label: "Prompt",
    }));
    const __VLS_38 = __VLS_37({
        modelValue: (__VLS_ctx.prompt),
        label: "Prompt",
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "text-caption" },
});
const __VLS_40 = {}.QToggle;
/** @type {[typeof __VLS_components.QToggle, typeof __VLS_components.qToggle, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    modelValue: (__VLS_ctx.allCollections),
    label: "All collections",
}));
const __VLS_42 = __VLS_41({
    modelValue: (__VLS_ctx.allCollections),
    label: "All collections",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
if (!__VLS_ctx.allCollections) {
    /** @type {[typeof CollectionPicker, ]} */ ;
    // @ts-ignore
    const __VLS_44 = __VLS_asFunctionalComponent(CollectionPicker, new CollectionPicker({
        modelValue: (__VLS_ctx.collectionsIds),
        ...{ class: "q-mt-md" },
    }));
    const __VLS_45 = __VLS_44({
        modelValue: (__VLS_ctx.collectionsIds),
        ...{ class: "q-mt-md" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_44));
}
var __VLS_16;
const __VLS_47 = {}.QCardActions;
/** @type {[typeof __VLS_components.QCardActions, typeof __VLS_components.qCardActions, typeof __VLS_components.QCardActions, typeof __VLS_components.qCardActions, ]} */ ;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({
    align: "right",
}));
const __VLS_49 = __VLS_48({
    align: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
__VLS_50.slots.default;
const __VLS_51 = {}.QBtn;
/** @type {[typeof __VLS_components.QBtn, typeof __VLS_components.qBtn, ]} */ ;
// @ts-ignore
const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
    flat: true,
    label: "Close",
    noCaps: true,
}));
const __VLS_53 = __VLS_52({
    flat: true,
    label: "Close",
    noCaps: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_52));
__VLS_asFunctionalDirective(__VLS_directives.vClosePopup)(null, { ...__VLS_directiveBindingRestFields, }, null, null);
const __VLS_55 = {}.QBtn;
/** @type {[typeof __VLS_components.QBtn, typeof __VLS_components.qBtn, ]} */ ;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
    flat: true,
    label: "Create",
    noCaps: true,
    ...{ class: "bg-primary text-white" },
    type: "submit",
    form: "create-api-key-form",
}));
const __VLS_57 = __VLS_56({
    flat: true,
    label: "Create",
    noCaps: true,
    ...{ class: "bg-primary text-white" },
    type: "submit",
    form: "create-api-key-form",
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
var __VLS_50;
var __VLS_8;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['collection-picker']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['q-pa-md']} */ ;
/** @type {__VLS_StyleScopedClasses['column']} */ ;
/** @type {__VLS_StyleScopedClasses['full-width']} */ ;
/** @type {__VLS_StyleScopedClasses['text-h6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['q-pt-none']} */ ;
/** @type {__VLS_StyleScopedClasses['col-grow']} */ ;
/** @type {__VLS_StyleScopedClasses['column']} */ ;
/** @type {__VLS_StyleScopedClasses['q-gutter-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['column']} */ ;
/** @type {__VLS_StyleScopedClasses['q-gutter-md']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['row']} */ ;
/** @type {__VLS_StyleScopedClasses['text-caption']} */ ;
/** @type {__VLS_StyleScopedClasses['q-mt-md']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-primary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            DatePickerInput: DatePickerInput,
            CollectionPicker: CollectionPicker,
            GeneralRules: GeneralRules,
            isVisible: isVisible,
            name: name,
            date: date,
            prompt: prompt,
            allCollections: allCollections,
            collectionsIds: collectionsIds,
            create: create,
        };
    },
    __typeEmits: {},
    props: {
        modelValue: Boolean,
        promptValue: Boolean,
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    props: {
        modelValue: Boolean,
        promptValue: Boolean,
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=ApiKeyCreateModal.vue.js.map