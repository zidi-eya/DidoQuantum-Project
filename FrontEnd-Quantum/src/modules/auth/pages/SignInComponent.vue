<template><div class="form-container sign-in-container">
  <form  @submit.prevent="onSubmit">
    <h1>Sign In</h1>
    <div class="social-container">
      <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
      <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
      <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
    </div>
    <span>or use your account</span>



    <input type="email"
      v-model="username"
      lazy-rules="ondemand"
      :rules="AuthRules.email"
      placeholder="Email"
       />




    <input type="password"
    v-model="password"
    lazy-rules="ondemand"
    :rules="AuthRules.passwordRequired"
    placeholder="Password" />

<div class="full-width row justify-between items-center">
        <q-checkbox v-model="rememberMe" label="Remember me" />
        <span
          class="text-bold text-primary cursor-pointer"
          @click="router.push({ name: RouteNames.FORGOT_PASSWORD })"
        >
          Forgot password?
        </span>
      </div>


      <button         type="submit"
      >Sign In</button>

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
  </form>
</div>
</template>
<script setup lang="ts">

import ErrorBox from '@/components/ErrorBox.vue';
import RoutePrefixes from '@/router/RoutePrefixes';
import {QForm , QBtn, QCheckbox,QInput,QIcon } from 'quasar'

import { ref } from 'vue';
import { SignInRequest } from '@/modules/auth/validation/sign-in';
import { useExceptionHandling } from '@/composables/exception-handling';
import { useAuthStore } from '../stores/auth-store';
import { useRouter } from 'vue-router';
import { AuthRules } from '@/utils/validation/rules';
import RouteNames from '@/modules/auth/router/RouteNames';
import PageHeadings from '@/components/PageHeadings.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import AppLogo from '@/components/AppLogo.vue';
import { AxiosError } from 'axios';
//import stripeService from '@/modules/stripe/services/StripeService';

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
          }
        }
      }
    );

    if (authStore.isLoggedIn) {
      await router.push(RoutePrefixes.PROTECTED);
    }
  });
}

</script>
