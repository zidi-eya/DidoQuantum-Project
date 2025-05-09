<template>
  <q-dialog v-model="isVisible" persistent>
    <q-card class="collection-picker rounded-sm q-pa-md column full-width">
      <q-card-section>
        <div class="text-h6 text-center">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none col-grow row">
        <div class="q-mt-md full-width full-height text-body1">
          {{ description }}
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" no-caps v-close-popup />
        <q-btn
          flat
          label="Confirm"
          no-caps
          class="bg-negative text-white"
          @click="confirm"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { QCard, QCardActions, QBtn, QCardSection, QDialog  } from 'quasar';

const props = defineProps({
  modelValue: Boolean,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void;
  (e: 'confirm'): void;
}>();
const isVisible = ref(false);

function confirm() {
  emit('confirm');
  isVisible.value = false;
}

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
