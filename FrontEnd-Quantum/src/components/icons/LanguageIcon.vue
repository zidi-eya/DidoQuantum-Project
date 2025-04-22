<template>
  <svg
    width="19"
    height="18"
    viewBox="0 0 22 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.87 13.57L9.33 11.06L9.36 11.03C11.1 9.09 12.34 6.86 13.07 4.5H16V2.5H9V0.5H7V2.5H0V4.49H11.17C10.5 6.42 9.44 8.25 8 9.85C7.07 8.82 6.3 7.69 5.69 6.5H3.69C4.42 8.13 5.42 9.67 6.67 11.06L1.58 16.08L3 17.5L8 12.5L11.11 15.61L11.87 13.57ZM17.5 8.5H15.5L11 20.5H13L14.12 17.5H18.87L20 20.5H22L17.5 8.5ZM14.88 15.5L16.5 11.17L18.12 15.5H14.88Z"
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
