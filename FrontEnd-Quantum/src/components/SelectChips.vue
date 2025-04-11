<template>
  <q-select
    ref="filteredSearchSelector"
    v-model="model"
    outlined
    multiple
    use-input
    use-chips
    color="primary"
    :hide-dropdown-icon="!options"
    input-debounce="0"
    option-label="label"
    option-value="value"
    emit-value
    @blur="handleBlur"
    @input-value="
      (it) => {
        unfocusedData = it;
        filter(it);
      }
    "
    @new-value="newValueAdded"
    @update:model-value="emit('update:modelValue', model)"
    v-bind="$attrs"
    :options="localOptions"
    @add="optionAdded"
    menu-anchor="bottom start"
    menu-self="top start"
    behavior="menu"
  >
    <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { SelectOption } from 'src/types/SelectOption';
import { ref, watch, PropType } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array as PropType<any[]>,
    required: true,
  },
  options: Array as PropType<SelectOption[]>,
  noInput: {
    type: Boolean,
    default: false,
  },
  searchable: {
    type: Boolean,
    default: false,
  },
});

const filteredSearchSelector = ref();

const emit = defineEmits<{
  (e: 'update:modelValue', v: any[]): void;
}>();

const model = ref<any[]>(props.modelValue);
const localOptions = ref<any[] | undefined>(props.options);
const unfocusedData = ref('');
function handleBlur() {
  if (
    !props.noInput &&
    unfocusedData.value &&
    !model.value.find((data: any) => data == unfocusedData.value)
  ) {
    model.value.push(unfocusedData.value);
    unfocusedData.value = '';
    emit('update:modelValue', model.value);
  }
}

function optionAdded() {
  filteredSearchSelector.value.updateInputValue('');
}

function newValueAdded(newVal: string, done: any) {
  if (!props.noInput) {
    done(newVal);
  } else if (props.options?.map((o) => o.value).includes(newVal)) {
    done(newVal);
  } else done();
}

function filter(val: string) {
  if (!props.searchable || localOptions.value === undefined) return;

  if (val === '') {
    localOptions.value = props.options;
    return;
  }

  const needle = val.toLowerCase();
  localOptions.value = props.options?.filter(
    (v) => v.label.toLowerCase().substring(0, needle.length) === needle
  );
}

watch(
  () => props.modelValue,
  (value) => {
    model.value = value;
  }
);
</script>
