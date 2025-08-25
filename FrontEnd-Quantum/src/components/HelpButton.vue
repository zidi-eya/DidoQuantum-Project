<template>
  <q-btn
    v-if="help_url"
    color="primary"
    icon="eva-question-mark-outline"
    rounded
    dense
    @click="navigateToDocs"
  />
</template>

<script setup lang="ts">
import { QBtn } from "quasar";

const props = defineProps({
  help_url: {
    type: String,
    required: true,
  },
});

function navigateToDocs() {
  const docs_url = import.meta.env.HELP_CENTER_URL;
  window.open(`${docs_url}/${props.help_url}`, "_blank");
}
</script>
