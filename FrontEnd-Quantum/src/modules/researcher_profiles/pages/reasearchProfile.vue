<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Liste des chercheurs</h2>

    <!-- Formulaire de création -->
    <q-form @submit.prevent="createProfile" class="mb-6 space-y-2">
      <q-input
        v-model="newProfile.skills"
        type="text"
        placeholder="Compétences"
        class="input"
        required
      />
      <q-input
        v-model="newProfile.topics"
        type="text"
        placeholder="Sujets de recherche"
        class="input"
        required
      />
      <q-input
        v-model="newProfile.publications"
        type="text"
        placeholder="Publications"
        class="input"
        required
      />
      <q-btn type="submit" class="btn btn-primary">Créer</q-btn>
    </q-form>

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
