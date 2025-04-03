<template>
  <q-input
    v-bind="$attrs"
    v-model="password"
    :type="isHidden ? 'password' : 'text'"
  >
    <template v-slot:prepend>
      <q-icon name="eva-lock-outline" />
    </template>
    <template v-slot:append>
      <q-icon
        :name="isHidden ? 'eva-eye-outline' : 'eva-eye-off-2-outline'"
        class="cursor-pointer"
        @click="toggleVisibility"
      />
    </template>
  </q-input>
</template>

<script setup lang="ts">
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

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== password.value) {
      password.value = newValue;
    }
  }
);

const toggleVisibility = () => {
  isHidden.value = !isHidden.value;
};
</script>
