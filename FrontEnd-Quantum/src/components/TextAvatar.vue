<template>
  <q-avatar v-bind="$attrs" class="bg-primary text-white">{{
    initials
  }}</q-avatar>
</template>

<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const initials = computed(() => {
  const names = props.name.split(' ');
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  } else {
    return names[0][0].toUpperCase();
  }
});
</script>
