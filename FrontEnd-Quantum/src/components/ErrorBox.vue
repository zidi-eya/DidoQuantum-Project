<template>
  <q-list v-if="errors && errors.length" bordered>
    <q-item v-for="(error, index) in errors" :key="index" dense>
      <q-item-section>
        {{ error }}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import {QList, QItem, QItemSection } from 'quasar'

defineProps({
  errors: {
    type: Array as () => string[],
    default: () => [],
  },
});
</script>
