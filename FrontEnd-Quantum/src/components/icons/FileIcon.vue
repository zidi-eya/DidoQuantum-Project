<template>
  <svg
    width="22"
    height="23"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_200_5212)">
      <path
        d="M20 6.5H12L10 4.5H4C2.9 4.5 2.01 5.4 2.01 6.5L2 18.5C2 19.6 2.9 20.5 4 20.5H20C21.1 20.5 22 19.6 22 18.5V8.5C22 7.4 21.1 6.5 20 6.5ZM14 16.5H6V14.5H14V16.5ZM18 12.5H6V10.5H18V12.5Z"
        :fill="color"
      />
    </g>
    <defs>
      <clipPath id="clip0_200_5212">
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
