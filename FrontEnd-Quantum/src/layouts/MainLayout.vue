<template>
  <q-layout>

  <q-drawer
      class="column shadow-sm q-px-sm drawer-menu"
      v-model="sidebarVisible"
      :mini="miniState"
      show-if-above
      :breakpoint="1024"
      :mini-width="84"
    >
      <q-item class="q-my-xs flex items-start justify-between q-px-none">
        <q-btn
          rounded
          dense
          flat
          @click="miniState = !miniState"
          icon="eva-menu-outline"
          padding="8px"
        />
        <img
          v-if="!miniState"
          class="cursor-pointer col-5"
          src="/image/qtpulse.webp"
          alt="logo"
          @click="router.push({ name: RouteNames.PROFILE })"
        />
        <div v-if="!miniState" class="col-1"></div>
      </q-item>
      <q-separator class="q-mb-md" />

      <q-list class="q-gutter-sm">
        <sidebar-link
          label="Profile"
          icon="eva-person-outline"
          active-icon="eva-person"
          :url="RouteNames.PROFILE"
        />
        <sidebar-link
          label="Upload"
          icon="eva-book-open-outline"
          active-icon="eva-book-open"
          :url="RouteNames.UPLOAD"
        />

      </q-list>
      <q-space />

      <q-item class="row justify-between items-center q-mb-sm">
        <span flat class="text-grey-7 text-caption"> v{{ version }}</span>
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
        class="col-grow full-height relative-position column no-wrap q-px-sm-lg q-px-md"
      >
        <div class="q-mt-md lt-md absolute-left q-ml-md q-pt-xs q-pl-sm">
          <q-btn
            rounded
            dense
            flat
            @click="sidebarVisible = !sidebarVisible"
            icon="eva-menu-outline"
            padding="7px"
          />
        </div>
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/modules/auth/stores/auth-store';
import { useRouter } from 'vue-router';
//import AdminRouteNames from '@/modules/admin/router/RouteNames';
import RoutePrefixes from '@/router/RoutePrefixes';
import AuthRouteNames from '@/modules/auth/router/RouteNames';
import SidebarLink from '@/components/sidebar/SidebarLink.vue';
import { QLayout, QDrawer, QItem,QList , QBtn , QPageContainer, QSpace, QSeparator} from 'quasar'
import RouteNames from "@/router/RoutePrefixes";


const isReportAddModalVisible = ref(false);
//const docs_url = import.meta.env.VITE_HELP_CENTER_URL;
//const faq_url = import.meta.env.VITE_FAQ_URL;
const miniState = ref(true);

const version = ref('1.0.0');

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

const sidebarHandler = () => {
  sidebarVisible.value = !sidebarVisible.value;
  miniState.value = !miniState.value;
};
</script>
<style lang="scss">
.drawer-menu {
  .q-item__section--avatar {
    min-width: auto !important;
  }
}
</style>
