<template>
  <q-input v-bind="$attrs" v-model="color">
    <template v-slot:prepend>
      <q-icon name="eva-color-palette-outline" />
    </template>
    <template v-slot:append>
      <q-icon
        name="colorize"
        :class="`${!$attrs.readonly ? 'cursor-pointer' : ''}`"
      >
        <q-popup-proxy
          v-if="!$attrs.readonly"
          cover
          transition-show="scale"
          transition-hide="scale"
        >
          <q-color v-model="color" />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: String,
});
const emit = defineEmits(['update:modelValue']);

const color = ref(props.modelValue);

watch(
  () => props.modelValue,
  (value) => {
    color.value = value;
  }
);
watch(color, () => {
  emit('update:modelValue', color.value);
});
</script>
