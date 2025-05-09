<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="q-pa-md self-center full-width">
    <q-btn
      v-for="tab in tabs"
      v-bind:key="tab.name"
      :class="activeTab.name == tab.name ? 'active' : 'text-grey-7'"
      class="custom-tabs-btn"
      flat
      unelevated
      no-caps
      color="primary"
      @click="setActiveTab(tab)"
    >
      <q-icon v-if="typeof tab.icon === 'string'" :name="tab.icon" />
      <component v-else :is="tab.icon" class="q-mr-xs" />
      <span>{{ tab.name }}</span>
    </q-btn>
  </div>
  <slot :name="activeTab.name" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

export type Tab = {
  name: string;
  icon: string | any;
};

const props = defineProps({
  tabs: {
    type: Array<Tab>,
    required: true,
  },
  activeTab: {
    type: Object as () => Tab,
  },
});

const emit = defineEmits(['update:activeTab']);
const localActiveTab = ref(props.activeTab);

const setActiveTab = (tab: Tab) => {
  localActiveTab.value = tab;
  emit('update:activeTab', tab);
};

watch(
  () => props.activeTab,
  (newActiveTab: any) => {
    localActiveTab.value = newActiveTab;
  }
);
</script>
