<template>
  <app-logo class="q-mb-xl" />
  <q-stepper header-nav v-model="step" vertical color="primary" animated>
    <q-step :name="1" title="Sign up" icon="settings" :done="step > 1">
      <page-headings subtitle="Let's start creating your account!" />
      <q-form greedy class="q-gutter-md full-width" @submit.prevent="onSubmit">
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
          label="Continue"
          type="submit"
          color="primary"
          icon-right="eva-arrow-downward-outline"
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
      </q-form>
    </q-step>
    <q-step
      :name="2"
      title="Select a Subscription"
      icon="eva-options-2-outline"
      :done="step > 2"
    >
      <page-headings subtitle="Select the subscription that fits you better!" />
      <div>
        <q-select
          outlined
          v-model="selectedPrice"
          :options="priceOptions"
          option-value="id"
          option-label="name"
          label="Subscriptions available"
        />
        <q-btn
          class="q-pa-md q-my-lg full-width"
          rounded
          label="I want this one, sign me up"
          type="submit"
          color="primary"
          icon-right="eva-checkmark-outline"
          @click="submitUserInformation"
          :loading="loading"
        />
      </div>
      <ErrorBox :errors="errors" />
    </q-step>
    <q-step
      :name="3"
      title="Proceed with payment"
      caption="Please proceed with the paymnet process in order to have you onboard"
      icon="eva-credit-card-outline"
      :done="step > 3"
      :header-nav="step > 3"
    >
      <div>
        <q-btn
          class="q-pa-md q-my-lg full-width"
          rounded
          label="Proceed with payment"
          color="primary"
          icon-right="eva-credit-card-outline"
          @click="redirectToCheckOut"
        />
      </div>
    </q-step>
  </q-stepper>
</template>

<script setup lang="ts">
import ErrorBox from 'src/components/ErrorBox.vue';
import { ref, onMounted } from 'vue';
import { useExceptionHandling } from 'src/composables/exception-handling';
import { useRouter } from 'vue-router';
import RouteNames from 'src/modules/auth/router/RouteNames';
import PageHeadings from 'src/components/PageHeadings.vue';
import PasswordInput from 'src/components/PasswordInput.vue';
import AppLogo from 'src/components/AppLogo.vue';
import authService from 'src/modules/auth/services/AuthService';
import { AuthRules, GeneralRules } from 'src/utils/validation/rules';
import { useAuthStore } from '../modules/auth/stores/auth-store';
import stripeService from 'src/modules/stripe/services/StripeService';
import { Price } from 'src/modules/stripe/models/price';

const { safeExecute, errors } = useExceptionHandling();
const router = useRouter();
const step = ref(1);
const loading = ref(false);
const authStore = useAuthStore();
const email = ref('');
const fullName = ref('');
const password = ref('');
const repeatPassword = ref('');
const selectedPrice = ref();
const priceOptions = ref<Price[]>([]);
const userBrief = ref();

onMounted(() => {
  safeExecute(async () => {
    priceOptions.value = await stripeService.getAllPrices();
  });
});

async function onSubmit() {
  step.value = 2;
}

async function submitUserInformation() {
  if (!selectedPrice.value) return;

  safeExecute(async () => {
    loading.value = true;
    const response = await authService.signUpWithEmailAndPassword(
      fullName.value,
      email.value,
      password.value
    );
    await authStore.reloadUser();
    userBrief.value = response.data;
    step.value = 3;
    loading.value = false;
  });
}

async function redirectToCheckOut() {
  safeExecute(async () => {
    loading.value = true;
    await stripeService.createCheckoutSession({
      priceId: selectedPrice.value.id,
      clientReferenceId: userBrief.value.client_reference_id,
    });
    loading.value = false;
  });
}
</script>
