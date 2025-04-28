<template>
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_73_5996)">
      <path
        d="M4.99935 15.8333C4.99935 16.75 5.74935 17.5 6.66602 17.5H13.3327C14.2493 17.5 14.9993 16.75 14.9993 15.8333V5.83333H4.99935V15.8333ZM15.8327 3.33333H12.916L12.0827 2.5H7.91602L7.08268 3.33333H4.16602V5H15.8327V3.33333Z"
        :fill="color"
      />
    </g>
    <defs>
      <clipPath id="clip0_73_5996">
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
