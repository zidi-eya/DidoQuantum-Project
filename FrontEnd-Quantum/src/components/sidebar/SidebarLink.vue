<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
    :active="isActive"
    :class="
      isActive
        ? 'bg-primary-light text-primary text-weight-bolder'
        : 'text-grey-7'
    "
    exactActiveClass="text-primary"
    class="rounded-full q-py-sm"
    @click="navigate"
  >
    <q-item-section avatar style="min-width: auto">
      <q-icon :name="isActive ? activeIcon ?? icon : icon" />
    </q-item-section>
    <q-item-section>{{ label }}</q-item-section>
  </q-item>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  activeIcon: {
    type: String,
    required: false,
  },
  externalUrl: {
    type: Boolean,
    default: false,
    required: false,
  },
  url: String,
  routeName: String,
  activeRegex: String,
});
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { QItem, QIcon, QItemSection } from 'quasar';

const router = useRouter();
const route = useRoute();

const isActive = computed<boolean>(() => {
  if (props.activeRegex) {
    return new RegExp(props.activeRegex).test(route.path);
  }

  if (props.url) {
    return route.path.includes(props.url);
  }

  if (props.routeName) {
    return route.name === props.routeName;
  }

  return false;
});

function navigate() {
  if (props.url) {
    props.externalUrl
      ? window.open(props.url, '_blank')
      : router.push(props.url);
  }

  if (props.routeName) {
    router.push({ name: props.routeName });
  }
}


</script>
