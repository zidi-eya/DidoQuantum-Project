<template>
  <q-item clickable class="text-grey-7">
    <q-item-section avatar>
      <q-tooltip
        v-if="tooltip"
        :delay="tooltipDelay"
        anchor="center end"
        self="center start"
      >
        {{ tooltip }}
      </q-tooltip>
      <q-icon :name="icon" />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
defineProps({
  tooltipDelay: {
    type: Number,
    default: 1000,
  },
  tooltip: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: true,
  },
});
</script>
