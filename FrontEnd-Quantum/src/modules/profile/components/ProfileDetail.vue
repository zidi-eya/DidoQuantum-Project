<template>
  <q-card class="shadow-1 q-pa-md">
    <card-header
      title="Profile Detail"
      subtitle="Update your profile, contact information to personalize your experience"
    />

    <q-card-section class="row q-gutter-md">
      <text-avatar
        :name="authStore.getUser.fullName"
        style="height: 5rem; width: 5rem"
      />
      <!-- <div class="column">
        <div class="text-body1 text-weight-medium">Profile Picture</div>
        <div class="row q-my-sm q-gutter-sm">
          <q-btn
            class="bg-primary text-white"
            dense
            no-caps
            icon-right="eva-cloud-upload-outline"
          >
            Upload Image
          </q-btn>

          <q-btn
            outline
            color="grey-6"
            dense
            no-caps
            icon-right="eva-trash-2-outline"
          >
            Remove
          </q-btn>
        </div>
        <div class="text-caption text-grey-7">
          We support JPG, PNG or GIF files under 5MB
        </div>
      </div> -->
    </q-card-section>

    <q-card-section>
      <q-form
        greedy
        id="profile-edit-form"
        class="row q-gutter-md"
        @submit.prevent="saveChanges"
      >
        <div class="col">
          <div class="text-body1 text-weight-medium">Full Name</div>
          <div v-if="!isEdditing">{{ authStore.getUser.fullName }}</div>
          <q-input
            v-else
            v-model="fullName"
            class="full-width"
            dense
            outlined
            lazy-rules="ondemand"
            :rules="GeneralRules.fieldRequired('Please enter your full name')"
            hide-bottom-space
          >
            <template v-slot:prepend>
              <q-icon name="eva-person-outline" />
            </template>
          </q-input>
        </div>
        <div class="col">
          <div class="text-body1 text-weight-medium">Email</div>
          <div>{{ authStore.getUser.email }}</div>
        </div>
      </q-form>
    </q-card-section>

    <q-card-actions v-if="isEdditing">
      <q-btn color="primary" no-caps type="submit" form="profile-edit-form">
        Save changes</q-btn
      >
      <q-btn outline color="grey-6" no-caps @click="cancelEdditing">
        Cancel
      </q-btn>
    </q-card-actions>

    <q-card-actions v-else>
      <q-btn color="primary" no-caps @click="isEdditing = true">
        Edit Profile</q-btn
      >
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import TextAvatar from '@/components/TextAvatar.vue';
import { useAuthStore } from '@/modules/auth/stores/auth-store';
import CardHeader from '@/components/CardHeader.vue';
import { GeneralRules } from '@/utils/validation/rules';
import { ref } from 'vue';
import { QInput, QCard ,QIcon, QCardSection, QForm, QBtn, QCardActions  } from 'quasar'

const authStore = useAuthStore();
const fullName = ref(authStore.getUser.fullName);
const isEdditing = ref(false);

function cancelEdditing() {
  isEdditing.value = false;
  fullName.value = authStore.getUser.fullName;
}

function saveChanges() {
  isEdditing.value = false;
  authStore.updateUser({ fullName: fullName.value });
}
</script>
