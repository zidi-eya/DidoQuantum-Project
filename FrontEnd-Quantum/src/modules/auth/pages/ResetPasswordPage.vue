<template>
    <app-logo class="q-mb-xl" />
    <page-headings
      title="Reset password"
      subtitle="Enter your new password below"
    />
    <q-form greedy class="q-gutter-md full-width" @submit.prevent="onSubmit">
      <password-input
        class="full-width"
        v-model="password"
        label="Password"
        standout="bg-primary text-white"
        lazy-rules="ondemand"
        :rules="AuthRules.passwordRequirements"
        hide-bottom-space
      />

      <password-input
        class="full-width"
        v-model="passwordConfirmation"
        label="Password confirmation"
        standout="bg-primary text-white"
        lazy-rules="ondemand"
        :rules="AuthRules.repeatPassword(password)"
        hide-bottom-space
      />

      <q-btn
        v-if="!passwordChanged"
        class="q-pa-md full-width"
        rounded
        label="Reset password"
        type="submit"
        color="primary"
        icon-right="eva-lock-outline"
      />
      <div v-else class="full-width">
        <q-banner class="bg-positive text-white full-width">
          <template v-slot:avatar>
            <q-icon name="eva-checkmark-circle-2-outline" />
          </template>
          Your password has been reset successfully. You can now sign in with
          your new password.
        </q-banner>

        <div class="q-mt-md">
          <span>Go back to</span>
          <span
            class="text-bold text-primary cursor-pointer"
            @click="router.push({ name: RouteNames.SIGN_IN })"
          >
            sign in page
          </span>
        </div>
      </div>

      <ErrorBox :errors="errors" />
    </q-form>
</template>

<script setup lang="ts">
import ErrorBox from 'src/components/ErrorBox.vue';

import { ref } from 'vue';
import { useExceptionHandling } from 'src/composables/exception-handling';
import { useRoute, useRouter } from 'vue-router';
import RouteNames from 'src/modules/auth/router/RouteNames';
import PasswordInput from 'src/components/PasswordInput.vue';
import authService from 'src/modules/auth/services/AuthService';
import PageHeadings from 'src/components/PageHeadings.vue';
import AppLogo from 'src/components/AppLogo.vue';
import { AuthRules } from 'src/utils/validation/rules';

const { safeExecute, errors } = useExceptionHandling();
const route = useRoute();
const router = useRouter();
const token = route.query.token as string;
const password = ref('');
const passwordConfirmation = ref('');
const passwordChanged = ref(false);

async function onSubmit() {
  await safeExecute(async () => {
    await authService.resetPassword(token, password.value);
    passwordChanged.value = true;
  });
}
</script>
