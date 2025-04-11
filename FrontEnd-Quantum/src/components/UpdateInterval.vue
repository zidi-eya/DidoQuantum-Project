<template>
    <q-toggle v-model="showFrequencies" color="primary" label="Enable automatic updates" v-bind="$attrs" :disable="disable"/>
    <div v-if="showFrequencies">
        <q-input
          v-model="frequency"
          type="number"
          label="Update interval (days)"
          outlined color="primary"
          :disable="disable"
          min="1"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    required: false,
  },
  disable: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits<{
  (e: 'update:modelValue', v: number | undefined): void;
}>();

const showFrequencies = ref(props.modelValue != undefined)

const frequency = ref<number | undefined>(props.modelValue)

watch(() => frequency.value, () => {
    if(frequency.value) {
        emit('update:modelValue', frequency.value)
    }
})

watch(() => showFrequencies.value, () => {
    frequency.value = showFrequencies.value ? 30 : undefined
    emit('update:modelValue', frequency.value)
})
</script>
