<template>
  <div v-if="breadcrumbs" class="q-my-md">
    <div class="hideOnsmall">
      <q-breadcrumbs>
        <q-breadcrumbs-el
          v-for="item in breadcrumbs"
          :key="item.label"
          :label="item.label"
          :class="item.routeName && 'cursor-pointer'"
          @click="
            item.routeName &&
              router.push({ name: item.routeName, params: item.params })
          "
        />
      </q-breadcrumbs>
    </div>

    <div class="row q-gutter-sm items-center">
      <span class="text-h4 text-weight-bold">
        {{ breadcrumbs[breadcrumbs.length - 1].label }}
        <help-button v-if="help_url" :help_url="help_url" />
      </span>
    </div>
  </div>
  <q-inner-loading
    v-if="isLoading"
    :showing="isLoading"
    color="primary"
  ></q-inner-loading>
  <q-scroll-area v-if="hasSlots && !isLoading" class="col-grow">
    <slot>
      <router-view />
    </slot>
  </q-scroll-area>
</template>

<script setup lang="ts">
import { PropType, useSlots } from 'vue';
import { useRouter } from 'vue-router';
import HelpButton from 'src/components/HelpButton.vue';
import { BreadcrumbItem } from 'src/types/Breadcrumb';

defineProps({
  breadcrumbs: Array as PropType<BreadcrumbItem[]>,
  isLoading: Boolean,
  help_url: {
    type: String,
    required: false,
  },
});

const slots = useSlots();
const hasSlots = Object.keys(slots).length > 0;
const router = useRouter();
</script>
