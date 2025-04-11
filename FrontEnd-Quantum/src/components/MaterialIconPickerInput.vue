<template>
  <q-input
    v-bind="$attrs"
    v-model="value"
    class="cursor-pointer"
    :input-class="`${!$attrs.readonly ? 'cursor-pointer' : ''}`"
  >
    <q-popup-proxy
      v-if="!$attrs.readonly"
      class="q-pa-md rounded-sm column items-center"
      transition-show="scale"
      transition-hide="scale"
      style="min-height: 10rem"
    >
      <search-input class="full-width" v-model="search" />

      <div class="row q-my-xl q-gutter-md">
        <q-icon
          v-for="icon in paginatedIcons"
          :key="icon"
          :name="icon"
          class="cursor-pointer"
          color="primary col-1"
          size="md"
          @click="value = icon"
          v-close-popup
        />
      </div>
      <q-pagination
        v-if="lastPage > 1"
        v-model="page"
        :max="lastPage"
        max-pages="6"
        direction-links
        outline
        color="primary"
        active-design="unelevated"
        active-color="primary"
        active-text-color="white"
      />
    </q-popup-proxy>

    <template v-slot:prepend>
      <q-icon name="eva-smiling-face-outline" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import materialIcons from 'src/utils/material-icons';
import { ref, computed, watch } from 'vue';
import SearchInput from 'src/components/SearchInput.vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
const value = ref(props.modelValue);
const search = ref('');

// find icons that contain the search string and ignore case
const icons = computed(() => {
  var result = [];

  if (!search.value) {
    result = materialIcons;
  } else {
    result = materialIcons.filter((icon) =>
      icon.toLowerCase().includes(search.value.toLowerCase())
    );
  }

  return result;
});

const paginatedIcons = computed(() => {
  const start = (page.value - 1) * pageSize;
  const end = start + pageSize;
  return icons.value.slice(start, end);
});

const pageSize = 24;
const page = ref(1);
const lastPage = computed(() => Math.ceil(icons.value.length / pageSize));
watch(
  () => props.modelValue,
  (newValue) => {
    value.value = newValue;
  }
);
watch(
  () => value.value,
  (newValue) => {
    emit('update:modelValue', newValue);
  }
);
watch(
  () => search.value,
  () => {
    page.value = 1;
  }
);
</script>
