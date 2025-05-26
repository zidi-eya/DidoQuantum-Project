<template>
  <q-badge outline :style="`color: ${color}`">{{ label }}</q-badge>
</template>

<script setup lang="ts">
import { SharedStatus } from "./shared-status";
import { PropType, computed } from "vue";
import { QBadge } from "quasar";

const props = defineProps({
  status: {
    type: String as PropType<SharedStatus>,
    required: true,
  },
});

const label = computed(() => {
  switch (props.status) {
    case SharedStatus.PUBLIC:
      return "Public";
    case SharedStatus.PRIVATE:
      return "Private";
    default:
      return "Unknown";
  }
});

const color = computed(() => {
  switch (props.status) {
    case SharedStatus.PUBLIC:
      return "#228B22"; // Forest Green
    case SharedStatus.PRIVATE:
      return "#FF0000"; // Red
    default:
      return "#808080"; // Grey
  }
});
</script>
