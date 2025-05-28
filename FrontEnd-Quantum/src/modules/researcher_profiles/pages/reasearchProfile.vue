<template>
  <header-layout
    :breadcrumbs="[
      {
        label: 'Researcher Proflies',
        routeName: RoutePrefixes.ADMIN,
      },
    ]"
    :help_url="DocURLS.ADMIN"
  />

  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Liste des chercheurs</h2>

    <!-- Formulaire de création -->
    <q-form @submit.prevent="createProfile" class="column q-gutter-md">
      <q-input
        v-model="newProfile.skills"
        label="Compétences"
        class="custom-field"
        dense
        outlined
        lazy-rules="ondemand"
        :rules="GeneralRules.fieldRequired('Please enter the project Titel')"
        hide-bottom-space
      />
      <q-input
        v-model="newProfile.topics"
        label="Sujets de recherche"
        class="input"
        dense
        outlined
        lazy-rules="ondemand"
        :rules="GeneralRules.fieldRequired('Please enter the project Titel')"
        hide-bottom-space
      />
      <q-input
        v-model="newProfile.publications"
        label="Publications"
        class="input"
        dense
        outlined
        lazy-rules="ondemand"
        :rules="GeneralRules.fieldRequired('Please enter the project Titel')"
        hide-bottom-space
      />
      <q-btn type="submit" label="Create Project" color="primary" />
    </q-form>
    <q-separator class="q-mt-sm-xs q-mt-md" />
    <!-- Liste des profils -->
    <div class="q-gutter-md">
      <q-card v-for="profile in profiles" :key="profile.id" class="q-pa-md" flat bordered>
        <q-card-section>
          <div class="text-subtitle1">
            <strong>Compétences:</strong> {{ profile.skills }}
          </div>
          <div class="text-subtitle1"><strong>Sujets:</strong> {{ profile.topics }}</div>
          <div class="text-subtitle1">
            <strong>Publications:</strong> {{ profile.publications }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            color="negative"
            label="Supprimer"
            @click="deleteProfile(profile.id)"
            flat
            dense
            icon="delete"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import HeaderLayout from "@/layouts/HeaderLayout.vue";
import RoutePrefixes from "@/router/RoutePrefixes";
import { DocURLS } from "@/utils/constants/doc-urls";
import { GeneralRules } from "@/utils/validation/rules";

import type {
  ResearcherProfileCreate,
  ResearcherProfileOut,
} from "@/modules/researcher_profiles/models/researcherProfileModel";
import { researcherProfileService } from "@/modules/researcher_profiles/service/researcherProfileService";
import {
  QBtn,
  QInput,
  QForm,
  QCard,
  QSeparator,
  QCardActions,
  QCardSection,
} from "quasar";

const profiles = ref<ResearcherProfileOut[]>([]);
const newProfile = ref<ResearcherProfileCreate>({
  skills: "",
  topics: "",
  publications: "",
});

const fetchProfiles = async () => {
  profiles.value = await researcherProfileService.getProfiles();
};

const createProfile = async () => {
  const created = await researcherProfileService.createProfile(newProfile.value);
  profiles.value.push(created);
  newProfile.value = { skills: "", topics: "", publications: "" };
};

const deleteProfile = async (id: number) => {
  await researcherProfileService.deleteProfile(id);
  profiles.value = profiles.value.filter((p) => p.id !== id);
};

onMounted(fetchProfiles);
</script>
