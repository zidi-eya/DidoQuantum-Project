<template>
  <slot></slot>

  <q-inner-loading v-if="!hideContent" :showing="isLoading" color="primary" />

  <q-spinner
    v-if="hideContent && isLoading"
    class="absolute-center"
    size="xl"
    color="primary"
  />
</template>

<script setup lang="ts">
defineProps({
  hideContent: {
    type: Boolean,
    default: true,
  },
  isLoading: {
    type: Boolean,
    default: true,
  },
});
</script>
