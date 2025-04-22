<template>
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_128_9404)">
      <path
        d="M20 6.5H19V14.5C19 15.05 18.55 15.5 18 15.5H6V16.5C6 17.6 6.9 18.5 8 18.5H18L22 22.5V8.5C22 7.4 21.1 6.5 20 6.5ZM17 11.5V4.5C17 3.4 16.1 2.5 15 2.5H4C2.9 2.5 2 3.4 2 4.5V17.5L6 13.5H15C16.1 13.5 17 12.6 17 11.5Z"
        :fill="color"
      />
    </g>
    <defs>
      <clipPath id="clip0_128_9404">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="translate(0 0.5)"
        />
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
