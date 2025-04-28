<template>
  <q-card class="shadow-1 q-mb-md q-pa-md">
    <card-header
      title="Change Password"
      subtitle="Change your password to keep your account secure"
    />

    <q-card-section>
      <q-form
        greedy
        id="change-password-form"
        class="column q-gutter-md"
        @submit.prevent="changePassword"
      >
        <div class="row">
          <password-input
            class="col-12 col-md-6 q-mr-md noMobileMargin"
            v-model="password"
            outlined
            label="Current Password"
            lazy-rules="ondemand"
            :rules="AuthRules.passwordRequired"
            hide-bottom-space
          />
        </div>
        <div class="row">
          <password-input
            class="col-12 col-md-6 q-mr-md noMobileMargin"
            v-model="newPassword"
            outlined
            label="New Password"
            lazy-rules="ondemand"
            :rules="AuthRules.passwordRequirements"
            hide-bottom-space
          />
          <password-input
            class="col-12 col-md-6 q-mt-md"
            v-model="passwordConfirmation"
            outlined
            label="Confirm Password"
            lazy-rules="ondemand"
            :rules="AuthRules.repeatPassword(newPassword)"
            hide-bottom-space
          />
        </div>
      </q-form>
    </q-card-section>

    <q-card-actions>
      <q-btn color="primary" no-caps type="submit" form="change-password-form"
        >Change password</q-btn
      >
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import CardHeader from '@/components/CardHeader.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import authService from '@/modules/auth/services/AuthService';
import { AuthRules } from '@/utils/validation/rules';
//import { DocURLS } from 'src/utils/constants/doc-urls';
import { ref } from 'vue';

const q = useQuasar();
const password = ref('');
const newPassword = ref('');
const passwordConfirmation = ref('');

async function changePassword() {
  try {
    await authService.changePassword(password.value, newPassword.value);
    password.value = '';
    newPassword.value = '';
    passwordConfirmation.value = '';

    q.notify({
      message: 'Password changed successfully',
      color: 'positive',
      position: 'bottom',
      timeout: 1000,
    });
  } catch {
    q.notify({
      message: 'Update failed, check your password and try again',
      color: 'negative',
      position: 'bottom',
      timeout: 1000,
    });
  }
}
</script>
