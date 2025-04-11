<template>
  <q-dialog v-model="isVisible" persistent>
    <q-card
      class=" rounded-sm q-pa-md full-width no-wrap dialogSize60"
      :style="` max-height: 90vh`"
    >
      <q-card-section v-if="title">
        <div class="text-h6 text-center">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none col-shrink" >
        <slot> </slot>
      </q-card-section>

      <slot name="custom-sections"> </slot>

      <q-card-actions align="right">
        <q-btn flat label="Close" no-caps v-close-popup />
        <slot name="actions"> </slot>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  title: String,
  width: {
    type: String,
    default: '30vw',
  },
});

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void;
}>();
const isVisible = ref(false);

watch(
  () => props.modelValue,
  (newVal) => {
    isVisible.value = newVal;
  }
);
watch(isVisible, (newVal) => {
  emit('update:modelValue', newVal);
});
</script>
