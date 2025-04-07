<template>
    <!--<app-logo class="q-mb-xl" />-->
    <page-headings
      title="Choose Subscription"
      subtitle="Choose the subscription that best fits your needs."
    />
    <div>
      <!--  <q-select
        outlined
        v-model="selectedPrice"
        :options="priceOptions"
        option-value="id"
        option-label="name"
        label="Subscriptions available"
      />-->

      <q-btn

        class="q-pa-md q-my-lg full-width"
        rounded
        label="Continue"
        color="primary"
      />
      <!--  @click="proceedWithPayment"
        :disable="!selectedPrice"-->
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PageHeadings from '@/components/PageHeadings.vue';
///import stripeService from 'src/modules/stripe/services/StripeService';
//import { Price } from 'src/modules/stripe/models/price';
import { useRoute } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';

//const priceOptions = ref<Price[]>([]);
//const selectedPrice = ref<Price>();
const route = useRoute();
const clientReferenceId = route.query.clientReferenceId as string;
/*async function proceedWithPayment() {
  const selected = selectedPrice.value;

  if (!selected) {
    return;
  }

  await stripeService.createCheckoutSession({
    priceId: selected.id,
    clientReferenceId: clientReferenceId,
  });
}

onMounted(async () => {
  priceOptions.value = await stripeService.getAllPrices();
});*/
</script>
