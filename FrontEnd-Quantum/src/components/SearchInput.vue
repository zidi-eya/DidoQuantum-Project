<template>
  <q-input
    class="col-grow"
    v-model="search"
    standout="bg-primary"
    rounded
    dense
    debounce="1000"
  >
    <template v-slot:append>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { QInput, QIcon } from 'quasar';

// Define the event you want to emit
const emit = defineEmits(['searchChange']);

const search = ref('');

// Watch for changes in the search ref
watch(search, (newValue, oldValue) => {
  // Emit the 'searchChange' event with the new value of search
  emit('searchChange', { newValue, oldValue });
});
</script>
