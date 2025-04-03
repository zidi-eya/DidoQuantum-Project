<template>
  <div v-if="title" class="text-h4 text-weight-bold q-mb-sm">{{ title }}</div>
  <div v-if="subtitle" class="text-subtitle1 q-mb-lg">{{ subtitle }}</div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
});
</script>
