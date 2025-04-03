<template>
  <app-logo class="q-mb-xl" />
  <page-headings
    title="Sign up"
    subtitle="You have received an invite. Create an account and let's get started!"
  />
  <q-form
    greedy
    class="q-gutter-md full-width q-mb-xl"
    @submit.prevent="onSubmit"
  >
    <q-input
      class="full-width"
      standout="bg-primary text-white"
      v-model="email"
      label="Email"
      lazy-rules="ondemand"
      :rules="AuthRules.email"
      hide-bottom-space
    >
      <template v-slot:prepend>
        <q-icon name="eva-email-outline" />
      </template>
    </q-input>

    <q-input
      class="full-width"
      standout="bg-primary text-white"
      v-model="fullName"
      label="Full name"
      lazy-rules="ondemand"
      :rules="GeneralRules.fieldRequired('Please enter your full name')"
      hide-bottom-space
    >
      <template v-slot:prepend>
        <q-icon name="eva-person-outline" />
      </template>
    </q-input>

    <password-input
      class="full-width"
      label="Password"
      standout="bg-primary text-white"
      v-model="password"
      lazy-rules="ondemand"
      :rules="AuthRules.passwordRequirements"
      hide-bottom-space
    />
    <password-input
      class="full-width"
      label="Repeat password"
      standout="bg-primary text-white"
      v-model="repeatPassword"
      lazy-rules="ondemand"
      :rules="AuthRules.repeatPassword(password)"
      hide-bottom-space
    />
    <q-btn
      class="q-pa-md q-my-lg full-width"
      rounded
      label="Sign up"
      type="submit"
      color="primary"
      icon-right="eva-log-in-outline"
    />
    <div>
      <span class="q-mr-sm">Already have an account?</span>
      <span
        class="text-bold text-primary cursor-pointer"
        @click="router.push({ name: RouteNames.SIGN_IN })"
      >
        Sign in
      </span>
    </div>
    <ErrorBox :errors="errors" />
  </q-form>
</template>

<script setup lang="ts">
import ErrorBox from 'src/components/ErrorBox.vue';

import { ref } from 'vue';
import { useExceptionHandling } from 'src/composables/exception-handling';
import { useRouter } from 'vue-router';
import RouteNames from 'src/modules/auth/router/RouteNames';
import PageHeadings from 'src/components/PageHeadings.vue';
import PasswordInput from 'src/components/PasswordInput.vue';
//import AppLogo from 'src/components/AppLogo.vue';
import authService from 'src/modules/auth/services/AuthService';
import { AuthRules, GeneralRules } from 'src/utils/validation/rules';
import RoutePrefixes from 'src/router/RoutePrefixes';
import { useAuthStore } from '../modules/auth/stores/auth-store';

const { safeExecute, errors } = useExceptionHandling();
const router = useRouter();

const authStore = useAuthStore();
const email = ref('');
const fullName = ref('');
const password = ref('');
const repeatPassword = ref('');

async function onSubmit() {
  safeExecute(async () => {
    await authService.signUpWithEmailAndPassword(
      fullName.value,
      email.value,
      password.value
    );
    await authStore.reloadUser();
    router.push(RoutePrefixes.PROTECTED);
  });
}
</script>
