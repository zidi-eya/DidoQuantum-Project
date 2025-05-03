<template>
  <header-layout
  :breadcrumbs="[
    {
      label: 'Profile',
      routeName: RouteNames.PROFILE,
    },
  ]"
  :help_url="DocURLS.PROFILE"
/>

  <q-tabs
    v-model="activeTab"
    align="left"
    class="text-grey-7"
    active-class="text-primary"
    indicator-color="primary"
  >
    <q-tab :name="ProfileTabs.GENERAL_SETTINGS" label="General Settings" no-caps />
    <q-tab :name="ProfileTabs.API_ACCESS" label="API Access" no-caps />
  </q-tabs>

  <q-tab-panels class="col-grow bg-transparent" v-model="activeTab" animated>
    <q-tab-panel class="q-px-none" :name="ProfileTabs.GENERAL_SETTINGS">
      <general-settings />
    </q-tab-panel>

   <!-- <q-tab-panel class="q-px-none" :name="ProfileTabs.API_ACCESS">
      <api-keys />
    </q-tab-panel>-->


  </q-tab-panels>
</template>

<script setup lang="ts">
import HeaderLayout from "@/layouts/HeaderLayout.vue";

import RouteNames from "@/modules/profile/router/RouteNames";
import GeneralSettings from "@/modules/profile/components/GeneralSettings.vue";
import ApiKeys from "@/modules/profile/components/ApiKeys.vue";
import { ref } from "vue";
import { QTab, QCard ,QTabPanel,QTabs, QTabPanels } from 'quasar'
import { DocURLS } from "@/utils/constants/doc-urls";


enum ProfileTabs {
  GENERAL_SETTINGS = "general-settings",
  API_ACCESS = "api-access",
}
const activeTab = ref(ProfileTabs.GENERAL_SETTINGS);
</script>
