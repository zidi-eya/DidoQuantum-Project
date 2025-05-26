<template>
  <div class="col-12 col-md-3 column">
    <q-btn
      no-caps
      rounded
      unelevated
      color="primary"
      icon="eva-plus-outline"
      @click="onCreate()"
      class="q-mb-sm-sm q-mb-md q-py-sm q-mx-sm-md text-weight-medium text-body2"
      :disable="isHistoryLoading"
      ><span class="q-pa-sm">{{ createBtnLabel }}</span>
    </q-btn>
    <card-header
      className="q-px-sm-md"
      descriptionClass="text-body1"
      :title="title"
      :subtitle="subtitle"
      v-if="!isMobileView"
    />
    <slot />
    <q-expansion-item
      group="HistoryGroup"
      :label="title"
      :caption="subtitle"
      v-if="isMobileView"
      header-class="bg-grey-4 text-black q-mx-sm-md"
      header-style="font-weight: bold;"
      :style="isMobileView ? '' : ''"
      v-model="expanded"
    >
      <q-scroll-area
        class="col-grow q-mt-sm"
        v-if="isMobileView"
        style="height: 200px"
      >
        <q-infinite-scroll
          @load="onLoad"
          :offset="50"
          :scroll-target="scrollTargetRef"
        >
          <slot
            name="item"
            v-for="item in filteredHistory"
            :key="item.id"
            :item="item"
          />

          <template v-slot:loading v-if="isHistoryLoading">
            <div v-if="history.length == 0">
              <slot name="skeleton" v-for="index in 4" :key="index" />
            </div>
            <slot name="skeleton" />
          </template>
        </q-infinite-scroll>
      </q-scroll-area>
    </q-expansion-item>

    <q-scroll-area
      class="col-grow q-mt-sm"
      v-if="!isMobileView"
      style="height: calc(100vh - 25.5rem)"
    >
      <q-infinite-scroll @load="onLoad" :offset="200">
        <slot
          name="item"
          v-for="item in filteredHistory"
          :key="item.id"
          :item="item"
        />

        <template v-slot:loading>
          <div v-if="history.length == 0">
            <slot name="skeleton" v-for="index in 4" :key="index" />
          </div>
          <slot name="skeleton" />
        </template>
      </q-infinite-scroll>
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">
import { Platform } from 'quasar';
import { LazyList } from '@/utils/functions/lazy-list';
import { PropType, onMounted, ref, computed } from 'vue';
import CardHeader from '@/components/CardHeader.vue';
import {  QExpansionItem, QBtn,   QInfiniteScroll, QScrollArea } from 'quasar';

const isMobileView = Platform.is.mobile;

const props = defineProps({
  lazyList: {
    type: LazyList<any>,
    required: true,
  },
  title: {
    type: String,
    default: 'History',
  },
  subtitle: {
    type: String,
    required: true,
  },
  createBtnLabel: {
    type: String,
    required: true,
  },
  onCreate: {
    type: Function as PropType<() => any>,
    required: true,
  },
  selectedFilter: {
    type: String,
    required: true,
    default: 'All'
  },
});

const history = ref(props.lazyList.data);
const isHistoryLoading = props.lazyList.isLoading;
const scrollTargetRef = ref();
const expanded = ref(true);



const filteredHistory = computed(() => {
  console.log('Filtering history with filter:', props.selectedFilter);
  if (props.selectedFilter === 'All') {
    return history.value;
  }
  return history.value.filter((item) => {

    const isPublic = item.organizationIds?.length > 0;
    if (props.selectedFilter === 'Public' && isPublic) {
      return true;
    } else if (props.selectedFilter === 'Private' && !isPublic) {
      return true;
    }
    return false;
  });
});

async function onLoad(index: number, done: any) {
  await props.lazyList.fetchMore();
  done();
}

onMounted(async () => {
  if (isMobileView) {
    await props.lazyList.fetchMore();
  }
});
</script>
