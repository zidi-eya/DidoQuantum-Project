<template>

    <app-logo class="q-mb-xl" />
    <page-headings title="Sign in" subtitle="Enter your email and password to sign in!" />
    <q-form greedy class="q-gutter-md full-width" @submit.prevent="onSubmit">
      <q-input
        class="full-width"
        standout="bg-primary text-white"
        v-model="username"
        label="Email"
        lazy-rules="ondemand"
        :rules="AuthRules.email"
        hide-bottom-space
      >
        <template v-slot:prepend>
          <q-icon name="eva-email-outline" />
        </template>
      </q-input>
      <password-input
        class="full-width"
        label="Password"
        standout="bg-primary text-white"
        v-model="password"
        lazy-rules="ondemand"
        :rules="AuthRules.passwordRequired"
        hide-bottom-space
      />
      <div class="full-width row justify-between items-center">
        <q-checkbox v-model="rememberMe" label="Remember me" />
        <span
          class="text-bold text-primary cursor-pointer"
          @click="router.push({ name: RouteNames.FORGOT_PASSWORD })"
        >
          Forgot password?
        </span>
      </div>
      <q-btn
        class="q-pa-md q-my-lg full-width"
        rounded
        label="Sign in"
        type="submit"
        color="primary"
        icon-right="eva-log-in-outline"
      />
      <div>
        <span class="q-mr-sm">Not registered yet?</span>
        <span
          class="text-bold text-primary cursor-pointer"
          @click="router.push({ name: RouteNames.SIGN_UP })"
        >
          Create an Account
        </span>
      </div>
      <ErrorBox :errors="errors" />
    </q-form>

</template>

<script setup lang="ts">
import ErrorBox from 'src/components/ErrorBox.vue';
import RoutePrefixes from 'src/router/RoutePrefixes';

import { ref } from 'vue';
import { SignInRequest } from 'src/modules/auth/validation/sign-in';
import { useExceptionHandling } from 'src/composables/exception-handling';
import { useAuthStore } from '../stores/auth-store';
import { useRouter } from 'vue-router';
import { AuthRules } from 'src/utils/validation/rules';
import RouteNames from 'src/modules/auth/router/RouteNames';
import PageHeadings from 'src/components/PageHeadings.vue';
import PasswordInput from 'src/components/PasswordInput.vue';
//import AppLogo from 'src/components/AppLogo.vue';
import { AxiosError } from 'axios';
//import stripeService from 'src/modules/stripe/services/StripeService';

const { safeExecute, errors } = useExceptionHandling();
const authStore = useAuthStore();
const router = useRouter();

const username = ref('');
const password = ref('');
const rememberMe = ref(false);

async function onSubmit() {
  await safeExecute(async () => {
    SignInRequest.parse({
      username: username.value,
      password: password.value,
    });
    await authStore.signInWithEmailAndPassword(
      username.value,
      password.value,
      rememberMe.value,
      async (e) => {
        if (e instanceof AxiosError) {
          if (e.response?.status === 402) {
            const clientReferenceId = e.response?.data.client_reference_id;
            const subscriptionId = e.response?.data.subscription_id;

          //  if (subscriptionId) {
          //    await stripeService.createCheckoutSession({ clientReferenceId : clientReferenceId});
           // } else {
           //   await router.push({
           //     name: RouteNames.FINISH_PAYMENT,
            //    query: { clientReferenceId },
           //   });
           // }
         // }
        }
      }
    );

    if (authStore.isLoggedIn) {
      await router.push(RoutePrefixes.PROTECTED);
    }
  });
}
</script>
