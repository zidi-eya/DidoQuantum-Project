<template>
    <!--<app-logo class="q-mb-xl" />-->
    <page-headings
      title="Forgot password"
      subtitle="Don't remember your password? No problem, we'll sort it out!."
    />
    <q-form greedy class="q-gutter-md full-width" @submit.prevent="onSubmit">
      <q-input
        class="full-width"
        standout="bg-primary text-white"
        v-model="email"
        label="Email"
        :readonly="emailSent"
        lazy-rules="ondemand"
        :rules="AuthRules.email"
        hide-bottom-space
      >
        <template v-slot:prepend>
          <q-icon name="eva-email-outline" />
        </template>
      </q-input>
      <div>
            <span class="q-mr-sm">Back to </span>
            <span
              class="text-bold text-primary cursor-pointer"
              @click="router.push({ name: RouteNames.SIGN_IN })"
            >
              Sign in
            </span>
          </div>
      <q-btn
        v-if="!emailSent"
        class="q-pa-md q-my-lg full-width"
        rounded
        label="Send email"
        type="submit"
        color="primary"
        icon-right="eva-email-outline"
      />

      <q-banner v-else class="bg-positive text-white">
        <template v-slot:avatar>
          <q-icon name="eva-checkmark-circle-2-outline" />
        </template>
        An email has been sent to your inbox with further instructions.
      </q-banner>

      <ErrorBox :errors="errors" />
    </q-form>
</template>

<script setup lang="ts">
import ErrorBox from '@/components/ErrorBox.vue';

import { ref } from 'vue';
import { useExceptionHandling } from '@/composables/exception-handling';
import authService from '@/modules/auth/services/AuthService';
import PageHeadings from '@/components/PageHeadings.vue';
//import AppLogo from '@/components/AppLogo.vue';
import { AuthRules } from '@/utils/validation/rules';
import RouteNames from '@/modules/auth/router/RouteNames';
import { useRouter } from 'vue-router';
import {  QBtn, QInput, QIcon, QBanner, QForm } from 'quasar'

const { safeExecute, errors } = useExceptionHandling();
const email = ref('');
const emailSent = ref(false);
const router = useRouter();
async function onSubmit() {
  await safeExecute(async () => {
    await authService.forgotPassword(email.value);
    emailSent.value = true;
  });
}
</script>
