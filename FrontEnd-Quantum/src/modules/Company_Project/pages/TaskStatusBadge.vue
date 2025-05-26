<template>
  <q-badge outline :style="`color: ${color}`"
    >{{ label }}
    <q-tooltip v-if="error?.length > 0">{{ error }}</q-tooltip>
  </q-badge>
</template>

<script setup lang="ts">
import { TaskStatus } from "./task-status";
import { PropType, computed } from "vue";
import { QTooltip, QBadge } from "quasar";
const props = defineProps({
  status: {
    type: String as PropType<TaskStatus>,
    required: true,
  },
  error: {
    type: String,
    required: false,
    default: "",
  },
});

const label = computed(() => {
  switch (props.status) {
    case TaskStatus.SUCCESS:
      return "Success";
    case TaskStatus.IN_PROGRESS:
      return "Pending";
    case TaskStatus.FAILED:
      return "Failed";
    default:
      return "Unknown";
  }
});

const color = computed(() => {
  switch (props.status) {
    case TaskStatus.SUCCESS:
      return "#228B22"; // Forest Green
    case TaskStatus.IN_PROGRESS:
      return "#228B22"; // Forest Green
    case TaskStatus.FAILED:
      return "#FF0000"; // Red
    default:
      return "#808080"; // Grey
  }
});
</script>
