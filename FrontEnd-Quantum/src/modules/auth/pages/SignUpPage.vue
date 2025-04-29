<template>
    <!--<app-logo class="q-mb-xl" />-->
    <q-stepper header-nav v-model="step" vertical color="primary" animated>
    <q-step :name="1" title="Sign up" icon="settings" :done="step > 1">
      <page-headings subtitle="Let's start creating your account as !" />
      <q-form greedy class="q-gutter-md full-width" @submit.prevent="onSubmit">

       <q-btn @click="selectUserType('esprit')" :color="userType === 'esprit' ? 'primary' : 'grey-5'"           :rules="AuthRules.passwordRequirements"
       >ESPRIT</q-btn>
        <q-btn @click="selectUserType('ai')" :color="userType === 'ai' ? 'primary' : 'grey-5'"           :rules="AuthRules.passwordRequirements"
        >AI researchers</q-btn>
        <q-btn @click="selectUserType('startup')" :color="userType === 'startup' ? 'primary' : 'grey-5'"           :rules="AuthRules.passwordRequirements"
        >Startups</q-btn>
        <q-btn @click="selectUserType('dev')" :color="userType === 'dev' ? 'primary' : 'grey-5'"           :rules="AuthRules.passwordRequirements"
        >Engineers & developers</q-btn>


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
          option-value="id"
          option-label="name"
          label="Subscriptions available"
        />
        <!-- :options="priceOptions"-->
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
        />
        <!--@click="redirectToCheckOut"-->
      </div>
    </q-step>
  </q-stepper>
</template>

<script setup lang="ts">
import ErrorBox from '@/components/ErrorBox.vue';
import { ref, onMounted } from 'vue';
import { useExceptionHandling } from '@/composables/exception-handling';
import { useRouter } from 'vue-router';
import RouteNames from '@/modules/auth/router/RouteNames';
import PageHeadings from '@/components/PageHeadings.vue';
import PasswordInput from '@/components/PasswordInput.vue';
//import AppLogo from '@/components/AppLogo.vue';
import authService from '@/modules/auth/services/AuthService';
import { AuthRules, GeneralRules } from '@/utils/validation/rules';
import { useAuthStore } from '@/modules/auth/stores/auth-store';
//import stripeService from '@/modules/stripe/services/StripeService';
//import { Price } from '@/modules/stripe/models/price';
import { QBtn, QInput,QForm,QStepper, QStep, QIcon , QSelect} from 'quasar'
import RoutePrefixes from '@/router/RoutePrefixes';

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
//const priceOptions = ref<Price[]>([]);
  const selectedRole = ref<string | null>(null); // Define the type and initialize to null or a default value

const userBrief = ref();
const userType = ref<string>('');
function selectUserType(type: string) {
  userType.value = type;
  localStorage.setItem('userType', type);
}
/*onMounted(() => {
  safeExecute(async () => {
    priceOptions.value = await stripeService.getAllPrices();
  });
});
*/
async function onSubmit() {
  step.value = 2;
  if (!userType.value) {
  alert('Veuillez sélectionner un type d’utilisateur.');
  return;
}
  safeExecute(async () => {
    loading.value = true;
    const response = await authService.signUpWithEmailAndPassword(
      fullName.value,
      email.value,
      password.value,
      userType.value
    );
    console.log('first response:', response , selectedRole.value);

    await authStore.reloadUser();
    userBrief.value = response.data;
    console.log('second userBrief:', userBrief.value);
    //await authService.assignRoleToUser(response.data.id, selectedRole.value);

    loading.value = false;
    localStorage.setItem('userType', userType.value || '');

    if (userType.value === 'esprit') {
  await router.push(RoutePrefixes.ESPRIT);
} else if (userType.value === 'ai') {
  await router.push('/ai-home');
} else if (userType.value === 'startup') {
  await router.push('/startup');
} else if (userType.value === 'dev') {
  await router.push('/dev-home');
}


  });
}

async function submitUserInformation() {
  if (!selectedPrice.value) return;

  safeExecute(async () => {
    loading.value = true;
    const response = await authService.signUpWithEmailAndPassword(
      fullName.value,
      email.value,
      password.value,
      userType.value

    );
    await authStore.reloadUser();
    userBrief.value = response.data;
    localStorage.setItem('userType', userType.value || '');

    step.value = 3;
    loading.value = false;
  });
}

/*async function redirectToCheckOut() {
  safeExecute(async () => {
    loading.value = true;
    await stripeService.createCheckoutSession({
      priceId: selectedPrice.value.id,
      clientReferenceId: userBrief.value.client_reference_id,
    });
    loading.value = false;
  });
}*/
</script>
