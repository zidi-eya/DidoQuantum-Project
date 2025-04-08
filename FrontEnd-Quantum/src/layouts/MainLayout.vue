<template>
  <q-layout>
    <YourPageComponent />

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
import { QItem, QSeparator, QSpace, QBtn, QDrawer, QPageContainer,QLayout } from 'quasar'

import YourPageComponent from '@/modules/pages/index.vue';

const isReportAddModalVisible = ref(false);
//const docs_url = import.meta.env.VITE_HELP_CENTER_URL;
//const faq_url = import.meta.env.VITE_FAQ_URL;


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
