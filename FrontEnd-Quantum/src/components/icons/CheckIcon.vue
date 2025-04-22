<template>
  <svg
    width="16"
    height="12"
    viewBox="0 0 16 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.49967 9.49935L1.99967 5.99935L0.833008 7.16602L5.49967 11.8327L15.4997 1.83268L14.333 0.666016L5.49967 9.49935Z"
      :fill="color"
    />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: 'currentColor',
  },
});
</script>
