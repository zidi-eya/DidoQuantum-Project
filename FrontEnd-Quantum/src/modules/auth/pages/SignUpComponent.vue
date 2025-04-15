<template>
  <div class="form-container sign-up-container">
    <form greedy  @submit.prevent="onSubmit">

   <div> <h1>Create Account</h1>
    <div class="social-container">
     <!-- <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
      <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
      <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>-->
      <button >ESPRIT </button>
      <button >AI researchers</button>
      <button >startups</button>
      <button >Engineers & developers</button>


    </div>


    <span>or use your email for registration</span></div>

    <input
      v-model="fullName"
      :rules="GeneralRules.fieldRequired('Please enter your full name')"
      type="text"
      placeholder="Name"
    />

    <input
      v-model="email"
      :rules="AuthRules.email"
      type="email"
      placeholder="Email"
    />
    <input
      v-model="password"
      :rules="AuthRules.passwordRequirements"
      type="password"
      placeholder="Password"
    />

    <input
      v-model="repeatPassword"
      :rules="AuthRules.passwordRequirements"
      type="password"
      placeholder="Password"
    />


    <button type="submit">Sign Up </button>
    <div>
      <span class="q-mr-sm">Already have an account?</span>
      <span
        class="text-bold text-primary cursor-pointer"
        @click="router.push({ name: RouteNames.SIGN_IN })"
      >
        Sign in
      </span>
    </div>
  </form>
</div>
</template>
<script setup lang="ts">
import ErrorBox from '@/components/ErrorBox.vue';
import { ref, onMounted } from 'vue';
import { useExceptionHandling } from '@/composables/exception-handling';
import { useRouter } from 'vue-router';
import RouteNames from '@/modules/auth/router/RouteNames';
import PageHeadings from '@/components/PageHeadings.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import AppLogo from '@/components/AppLogo.vue';
import authService from '@/modules/auth/services/AuthService';
import { AuthRules, GeneralRules } from '@/utils/validation/rules';
import { useAuthStore } from '@/modules/auth/stores/auth-store';
//import stripeService from '@/modules/stripe/services/StripeService';
//import { Price } from '@/modules/stripe/models/price';
import { QBtn, QInput,QForm,QStepper, QStep, QIcon , QSelect} from 'quasar'

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
const userBrief = ref();

/*onMounted(() => {
  safeExecute(async () => {
    priceOptions.value = await stripeService.getAllPrices();
  });
});
*/
async function onSubmit() {
 // step.value = 2;
 console.log("Navigating to /ListUser"); // Debug log

 router.push('/index');
 console.log(userBrief.value);

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
