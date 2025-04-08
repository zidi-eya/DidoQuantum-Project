<template>
  <q-layout>
    <q-drawer class="column shadow-2" v-model="sidebarVisible">
      <q-item class="q-my-md flex-center">

      </q-item>
      <q-separator />

      <q-list class="q-mt-md">


        <q-expansion-item
          icon="eva-globe-outline"
          label="Organizations"
          group="menuGroup"
          class="text-grey-7"
        >


        </q-expansion-item>
        <sidebar-link
          label="Profile"
          icon="eva-person-outline"
          active-icon="eva-person"
          :url="RoutePrefixes.PROFILE"
        />
        <q-expansion-item
          v-if="authStore.isAdmin"
          icon="eva-shield-outline"
          label="Admin"
          group="menuGroup"
          class="text-grey-7"
        >

        </q-expansion-item>
        <q-expansion-item
          icon="eva-book-outline"
          label="Documentation And FAQ"
          group="menuGroup"
          class="text-grey-7"
        >
          <sidebar-link
            class="q-pl-xl"
            label="Documentation"
            icon="eva-map-outline"
            :url="docs_url"
            external-url
          />
          <sidebar-link
            class="q-pl-xl"
            label="FAQ"
            icon="eva-question-mark-outline"
            :url="faq_url"
            external-url
          />
        </q-expansion-item>

        <sidebar-link
          label="Report"
          icon="report"
          active-icon="report"
          @click="isReportAddModalVisible = true"
        />
        <report-modal v-model="isReportAddModalVisible" />
      </q-list>
      <q-space />

      <q-item class="row justify-between items-center q-mb-sm">
        <div>
          <text-avatar size="md" :name="authStore.getUser.fullName" />
          <span class="text-weight-medium q-ml-sm">
            {{ authStore.getUser.fullName }}
          </span>
        </div>
        <div class="q-gutter-sm">
          <!-- <q-btn round flat icon="eva-settings-2-outline" /> -->
          <q-btn
            round
            flat
            bordered
            icon="eva-log-out-outline"
            @click="signOut"
          />
        </div>
      </q-item>
    </q-drawer>

    <q-page-container
      class="row no-wrap"
      style="
        height: 100vh;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 1) 0%,
          rgba(243, 246, 250, 1) 50%,
          rgba(255, 255, 255, 1) 100%
        );
      "
    >
      <div
        class="col-grow full-height relative-position column no-wrap q-px-lg"
      >
        <div class="q-mt-md">
          <q-btn
            rounded
            dense
            flat
            @click="sidebarVisible = !sidebarVisible"
            icon="eva-menu-outline"
          />
        </div>
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '@/modules/auth/stores/auth-store';
import { useRouter } from 'vue-router';
//import AdminRouteNames from '@/modules/admin/router/RouteNames';
import RoutePrefixes from '@/router/RoutePrefixes';
import AuthRouteNames from '@/modules/auth/router/RouteNames';
//import SidebarLink from 'sr/components/sidebar/SidebarLink.vue';


const isReportAddModalVisible = ref(false);
const docs_url = process.env.HELP_CENTER_URL;
const faq_url = process.env.FAQ_URL;

const router = useRouter();
const authStore = useAuthStore();

const sidebarVisible = ref(true);

async function signOut() {
  await authStore.signOut();
  await router.push({ name: AuthRouteNames.SIGN_IN });
}



const isMobile = computed(() => {
  return window.matchMedia('(max-width: 768px)').matches;
});

if (isMobile.value) {
  sidebarVisible.value = false;
}
</script>
