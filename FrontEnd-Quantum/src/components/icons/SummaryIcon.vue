<template>
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_128_9391)">
      <path
        d="M15.59 4.09C15.21 3.71 14.7 3.5 14.17 3.5H5C3.9 3.5 3.01 4.4 3.01 5.5L3 19.5C3 20.6 3.89 21.5 4.99 21.5H19C20.1 21.5 21 20.6 21 19.5V10.33C21 9.8 20.79 9.29 20.41 8.92L15.59 4.09ZM8 17.5C7.45 17.5 7 17.05 7 16.5C7 15.95 7.45 15.5 8 15.5C8.55 15.5 9 15.95 9 16.5C9 17.05 8.55 17.5 8 17.5ZM8 13.5C7.45 13.5 7 13.05 7 12.5C7 11.95 7.45 11.5 8 11.5C8.55 11.5 9 11.95 9 12.5C9 13.05 8.55 13.5 8 13.5ZM8 9.5C7.45 9.5 7 9.05 7 8.5C7 7.95 7.45 7.5 8 7.5C8.55 7.5 9 7.95 9 8.5C9 9.05 8.55 9.5 8 9.5ZM14 9.5V5L19.5 10.5H15C14.45 10.5 14 10.05 14 9.5Z"
        :fill="color"
      />
    </g>
    <defs>
      <clipPath id="clip0_128_9391">
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
