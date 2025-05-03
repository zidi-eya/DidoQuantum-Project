
<template>
  <div
    class="full-width q-py-sm row flex items-center justify-between q-pl-xl q-pl-md-none"
  >
    <div class="row q-gutter-sm flex items-center col-md-5 col-grow">
      <svg
        width="44"
        height="32"
        viewBox="0 0 44 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <rect width="44" height="32" fill="url(#pattern0_167_1114)" />
        <defs>
          <pattern
            id="pattern0_167_1114"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              xlink:href="#image0_167_1114"
              transform="matrix(0.00227273 0 0 0.003125 -0.0681818 -0.3125)"
            />
          </pattern>
          <image
            id="image0_167_1114"
            width="500"
            height="500"
            src="/image/SI.png"
          />
        </defs>
      </svg>

      <span class="text-h6 text-weight-bold" v-if="breadcrumbs">
        {{ breadcrumbs[breadcrumbs.length - 1].label }}
      </span>
      <help-button v-if="help_url" :help_url="help_url" />
    </div>
    <q-input
      type="search"
      dense
      outlined
      label="Search"
      rounded
      class="gt-sm custom-field col-4 hidden"
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-item class="row justify-end items-center col-md-3 col-grow q-pr-none">
      <q-btn round flat bordered fab-mini>
        <text-avatar size="md" :name="authStore.getUser?.fullName" />

        <q-menu>
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md text-center">Settings</div>
              <q-btn
                class="menu_item"
                align="left"
                icon="account_circle"
                label="Profile"
                @click="goToProfile"
                no-caps
                flat
              />
              <q-btn
                class="menu_item"
                align="left"
                icon="card_membership"
                label="Subscription"
                @click="goToSubscription"
                no-caps
                flat
              />
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <text-avatar size="72px" :name="authStore.getUser?.fullName" />

              <div class="text-subtitle2 q-mt-md q-mb-md">
                {{ authStore.getUser?.fullName }}
              </div>

              <q-btn
                color="primary"
                label="Logout"
                size="sm"
                v-close-popup
                @click="signOut"
              />
            </div>
          </div>
        </q-menu>
      </q-btn>
    </q-item>
  </div>
</template>
<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  padding: 0;
}

.menu_item {
  margin: 0;
  padding: 10px;
  width: 100%;
  text-align: left;
}
</style>
<script setup lang="ts">
import { BreadcrumbItem } from '@/types/Breadcrumb';
import { PropType } from 'vue';
import HelpButton from '@/components/HelpButton.vue';
import { useAuthStore } from '@/modules/auth/stores/auth-store';
import TextAvatar from '@/components/TextAvatar.vue';
import { useRouter, useRoute } from 'vue-router';
import AuthRouteNames from '@/modules/auth/router/RouteNames';
import { QInput, QIcon, QBtn, QMenu, QSeparator, QItem } from 'quasar';

defineProps({
  breadcrumbs: Array as PropType<BreadcrumbItem[]>,
  help_url: {
    type: String,
    required: false,
  },
});
const authStore = useAuthStore();
const router = useRouter();

const goToProfile = () => {
  router.push('/profile');
};

const goToSubscription = () => {
  router.push('/subscription');
};

async function signOut() {
  await authStore.signOut();
  await router.push({ name: AuthRouteNames.SIGN_IN });
}
</script>
