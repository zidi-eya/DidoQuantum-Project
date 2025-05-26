<template>
  <q-card class="q-pa-md">
    <q-form @submit.prevent="submit">
      <q-input v-model="profile.name" label="Nom" />
      <q-input v-model="profile.domain" label="Domaine" />
      <q-input v-model="profile.skills" label="Compétences (séparées par virgule)" />
      <q-btn label="Enregistrer" type="submit" color="primary" />
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { QForm, QCard, QInput, QBtn } from "quasar";
const profile = ref({
  name: "",
  domain: "",
  skills: "",
});

const submit = async () => {
  await axios.post("/api/researchers", {
    ...profile.value,
    skills: profile.value.skills.split(",").map((s) => s.trim()),
  });
};
</script>
