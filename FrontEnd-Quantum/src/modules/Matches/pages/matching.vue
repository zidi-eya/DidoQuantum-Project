<template>
  <header-layout
    :breadcrumbs="[
      {
        label: 'Maches',
        routeName: RoutePrefixes.UPLOAD,
      },
    ]"
    :help_url="DocURLS.ADMIN"
  />
 <breadcrumbs-layout
    :breadcrumbs="[
      {
        label: 'Tools',
        routeName: RoutePrefixes.ADMIN,
      },
    ]"
    :help_url="DocURLS.ADMIN"
  />
    <!--<q-tabs
    v-model="activeTab"
    align="left"
    class="q-mb-lg"
    active-class="text-primary"
    indicator-color="primary"
  >
    <q-tab :name="ToolTabs.ALL" :label="ToolTabs.ALL" no-caps />
    <q-tab :name="ToolTabs.FAVORITES" :label="ToolTabs.FAVORITES" no-caps />
    <q-tab :name="ToolTabs.ADMINISTRATIVE" :label="ToolTabs.ADMINISTRATIVE" no-caps />
    <q-tab :name="ToolTabs.CUSTOMERSUPPORT" :label="ToolTabs.CUSTOMERSUPPORT" no-caps />
    <q-tab :name="ToolTabs.HUMANRESOURCES" :label="ToolTabs.HUMANRESOURCES" no-caps />
    <q-tab :name="ToolTabs.MARKETING" :label="ToolTabs.MARKETING" no-caps />
    <q-tab :name="ToolTabs.SALES" :label="ToolTabs.SALES" no-caps />
  </q-tabs>
-->
  <q-scroll-area class="col-grow">
    <empty-widget v-if="filteredTools.length === 0" />
    <div class="row q-mb-md q-col-gutter-md">
      <div
        v-for="tool in filteredTools"
        :key="tool.title"
        class="col-12 col-md-5 col-lg-3 column"
        style="max-width: 390px; margin-top: 1.5em"
      >
        <q-card class="shadow-1 rounded-sm full-height row column justify-between">
          <img
            class="q-pa-md rounded cursor-pointer"
            :src="tool.imgSrc"
            style="height: 15rem; object-fit: cover"
            @click="router.push({ name: tool.routeName })"
          />

          <q-card-section class="q-py-none col-grow">
            <div
              class="text-body1 text-bold cursor-pointer"
              @click="router.push({ name: tool.routeName })"
            >
              {{ tool.title }}
            </div>
            <div class="text-body2 text-grey-7">
              {{ tool.description }}
            </div>
          </q-card-section>

          <q-card-actions class="q-pt-lg" align="between">
            <q-btn
              flat
              rounded

            />
            <!--:class="isFavorite(tool) ? 'text-primary' : 'text-grey-7'"
              :icon="isFavorite(tool) ? 'eva-heart' : 'eva-heart-outline'"
              @click="toggleFavorite(tool)"-->
            <q-btn
              no-caps
              flat
              rounded
              dense
              class="bg-primary text-white q-px-md"
              icon-right="eva-arrow-forward-outline"
              @click="router.push({ name: tool.routeName })"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-scroll-area>
</template>

<script setup lang="ts">
//import RoutePrefixes from "src/modules/tools/router/RoutePrefixes";
import EmptyWidget from "@/components/EmptyWidget.vue";
import { computed, ref } from "vue";
//import { LocalStorageKeys } from "src/utils/constants/storage";
import { DocURLS } from "@/utils/constants/doc-urls";
import { useRouter } from "vue-router";
import BreadcrumbsLayout from "@/layouts/BreadcrumbsLayout.vue";
import HeaderLayout from "@/layouts/HeaderLayout.vue";
import RoutePrefixes from "@/router/RoutePrefixes";
import { QBtn,QScrollArea, QCardActions ,QCard, QCardSection , QTab} from 'quasar'


enum ToolTabs {
  ALL = "All",
  FAVORITES = "Favorites",
  ADMINISTRATIVE = "Administrative",
  CUSTOMERSUPPORT = "Customer Support",
  HUMANRESOURCES = "Human Resources",
  MARKETING = "Marketing",
  SALES = "Sales",
}

type ToolCard = {
  title: string;
  description: string;
  imgSrc: string;
  routeName: RoutePrefixes;
};

const allTools: ToolCard[] = [
  {
    title: "Q&A Chat",
    description: "Get answers to your questions based on your saved knowledge bases.",
    imgSrc: "/images/vitaminai/qa-chat.png",
    routeName: RoutePrefixes.COMPANY,
  },





];
const router = useRouter();
//const favorites = useLocalStorage<ToolCard[]>(
  //LocalStorageKeys.TOOLS_OVERVIEW_FAVORITES,
  []
//);
const activeTab = ref(ToolTabs.ALL);

const disabledToolsList = JSON.parse(import.meta.env.VITE_DISABLED_TOOLS!);

const filteredTools = computed(() => {
  const normalizeRouteName = (routeName: string) =>
    routeName.toUpperCase().replace(/-/g, "_");

  const isToolEnabled = (routeName: string) => {
    const isDisabled = disabledToolsList.includes(normalizeRouteName(routeName));

    return isDisabled == false;
  };

  const enabledTools = allTools.filter((tool) => isToolEnabled(tool.routeName));

  switch (activeTab.value) {
    case ToolTabs.FAVORITES:
     // return favorites.value.filter((tool) => isToolEnabled(tool.routeName));
    case ToolTabs.ADMINISTRATIVE:
      return enabledTools.filter((tool) =>
        [
           RoutePrefixes.COMPANY,
        ].includes(tool.routeName)
      );
    case ToolTabs.CUSTOMERSUPPORT:
      return enabledTools.filter((tool) =>
        [
           RoutePrefixes.COMPANY,
        ].includes(tool.routeName)
      );
    case ToolTabs.HUMANRESOURCES:
      return enabledTools.filter((tool) =>
        [
          RoutePrefixes.COMPANY,
        ].includes(tool.routeName)
      );
    case ToolTabs.MARKETING:
      return enabledTools.filter((tool) =>
        [
           RoutePrefixes.COMPANY,
        ].includes(tool.routeName)
      );
    case ToolTabs.SALES:
      return enabledTools.filter((tool) =>
        [
          RoutePrefixes.COMPANY,

        ].includes(tool.routeName)
      );
    case ToolTabs.ALL:
      return enabledTools;
    default:
      return enabledTools;
  }
});

/**function toggleFavorite(tool: ToolCard) {
 // const index = favorites.value.findIndex((t) => t.title === tool.title);
  if (index === -1) {
    favorites.value.push(tool);
  } else {
    favorites.value.splice(index, 1);
  }
}
function isFavorite(tool: ToolCard) {
  return favorites.value.findIndex((t) => t.title === tool.title) !== -1;
}**/
</script>
