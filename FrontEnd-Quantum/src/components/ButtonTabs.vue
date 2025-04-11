<template>
  <div class="row q-gutter-sm">
    <q-btn
      v-for="option in options"
      :key="option"
      flat
      no-caps
      rounded
      :class="
        selected === option ? 'bg-primary text-white' : 'bg-grey-3 text-grey-7'
      "
      @click="selected = option"
      >{{ option }}</q-btn
    >
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue';

const props = defineProps({
  options: {
    type: Array as PropType<string[]>,
    required: true,
  },
  defaultOption: {
    type: String,
  },
});
const emit = defineEmits(['update:modelValue']);

const selected = ref(
  props.options.find((o) => o === props.defaultOption) ?? props.options[0]
);

watch(
  () => selected.value,
  (newVal) => {
    emit('update:modelValue', newVal);
  }
);
</script>
