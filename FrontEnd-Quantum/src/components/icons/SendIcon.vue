<template>
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_73_6041)">
      <path
        d="M1.67435 17.5L19.166 10L1.67435 2.5L1.66602 8.33333L14.166 10L1.66602 11.6667L1.67435 17.5Z"
        :fill="color"
      />
    </g>
    <defs>
      <clipPath id="clip0_73_6041">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
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
