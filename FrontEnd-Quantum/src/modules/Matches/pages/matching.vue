<template>
  <q-page class="q-pa-md">
    <q-btn
      label="Générer les correspondances"
      color="primary"
      @click="generate"
      class="q-mb-md"
    />
    <q-input
      v-model="researcherId"
      label="ID du chercheur"
      type="number"
      class="q-mb-md"
    />

    <q-btn label="Afficher les correspondances" color="secondary" @click="fetchMatches" />

    <q-list v-if="matches.length" bordered class="q-mt-md">
      <q-item v-for="match in matches" :key="match.id" class="q-mb-sm">
        <q-item-section>
          <q-item-label><strong>Project ID:</strong> {{ match.project_id }}</q-item-label>
          <q-item-label
            ><strong>Score:</strong> {{ match.score.toFixed(2) }}</q-item-label
          >
        </q-item-section>
      </q-item>
    </q-list>

    <q-banner v-else-if="matchesFetched" class="bg-grey-3 text-black q-mt-md">
      Aucune correspondance trouvée.
    </q-banner>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import matchingService from "@/modules/Matches/service/matchingService";

import {
  QBtn,
  QBanner,
  QPage,
  QList,
  QItem,
  QInput,
  QItemSection,
  QItemLabel,
  useQuasar,
} from "quasar";

const matches = ref([]);
const matchesFetched = ref(false);
const researcherId = ref(null);
const $q = useQuasar();

const generate = async () => {
  try {
    await matchingService.generateMatches();
    $q.notify({ type: "positive", message: "Matching généré avec succès" });
  } catch (err) {
    $q.notify({ type: "negative", message: "Erreur lors du matching" });
  }
};

const fetchMatches = async () => {
  try {
    const data = await matchingService.getMatchesForResearcher(researcherId.value);
    matches.value = data;
    matchesFetched.value = true;
  } catch (err) {
    matches.value = [];
    matchesFetched.value = true;
    $q.notify({ type: "negative", message: "Aucune correspondance trouvée" });
  }
};
</script>
