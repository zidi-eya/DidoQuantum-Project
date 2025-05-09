<template>
  <q-card-section class="row justify-between items-center">
    <div class="full-width">
      <div class="row justify-between">
        <div v-if="title" class="text-h6 text-bold">{{ title }}</div>
        <help-button v-if="help_url" :help_url="help_url"/>
      </div>
      <div v-if="subtitle" class="text-caption text-grey-7">
        {{ subtitle }}
      </div>
    </div>
    <slot />
  </q-card-section>
</template>

<script setup lang="ts">
import { QCardSection  } from 'quasar'

import HelpButton from '@/components/HelpButton.vue'
defineProps({
  title: String,
  subtitle: String,
  help_url: {
    type: String,
    required: false,
  }
});
</script>
