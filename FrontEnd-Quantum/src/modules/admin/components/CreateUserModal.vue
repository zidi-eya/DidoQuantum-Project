<template>
  <q-dialog v-model="isVisible" persistent>
    <q-card class="rounded-sm q-pa-md column full-width">
      <q-card-section>
        <div class="text-h6 text-center">Create new user</div>
      </q-card-section>

      <q-card-section class="q-pt-none col-grow row">
        <q-form
          greedy
          id="create-user-form"
          class="column q-gutter-md q-mt-md full-width full-height"
          @submit.prevent="create"
        >
          <q-input
            outlined
            label="Email"
            v-model="email"
            dense
            lazy-rules="ondemand"
            :rules="AuthRules.email"
            hide-bottom-space
          >
            <template v-slot:prepend>
              <q-icon name="eva-email-outline" />
            </template>
          </q-input>
          <q-input
            outlined
            label="Full name"
            v-model="fullName"
            dense
            lazy-rules="ondemand"
            :rules="GeneralRules.fieldRequired('Please enter full name')"
            hide-bottom-space
          >
            <template v-slot:prepend>
              <q-icon name="eva-text-outline" />
            </template>
          </q-input>
          <password-input
            outlined
            label="Password"
            v-model="password"
            dense
            lazy-rules="ondemand"
            :rules="AuthRules.passwordRequirements"
            hide-bottom-space
          />
          <password-input
            outlined
            label="Confirm password"
            v-model="confirmPassword"
            dense
            lazy-rules="ondemand"
            :rules="AuthRules.repeatPassword(password)"
            hide-bottom-space
          />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" no-caps @click="close" />
        <q-btn
          no-caps
          flat
          label="Create"
          class="bg-primary text-white"
          type="submit"
          form="create-user-form"
        />
      </q-card-actions>

      <q-inner-loading :showing="isLoading" color="primary" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { User } from "@/modules/auth/models/user";
import userService from "@/modules/admin/services/UserService";
import PasswordInput from "@/components/PasswordInput.vue";
import { AuthRules, GeneralRules } from "@/utils/validation/rules";
import {
  QCard,
  QDialog,
  QInnerLoading,
  QBtn,
  QInput,
  QForm,
  QCardActions,
  QCardSection,
  QIcon,
} from "quasar";

const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
  (e: "created", v: User): void;
}>();

const isLoading = ref(false);
const isVisible = ref(false);
const email = ref("");
const fullName = ref("");
const password = ref("");
const confirmPassword = ref("");

function close() {
  isVisible.value = false;
  email.value = "";
  fullName.value = "";
  password.value = "";
  confirmPassword.value = "";
  isLoading.value = false;
}

async function create() {
  isLoading.value = true;
  const user = await userService.createUser(email.value, fullName.value, password.value);

  isLoading.value = false;
  emit("created", user);
  close();
}

watch(
  () => props.modelValue,
  (value) => {
    isVisible.value = value;
  }
);
watch(
  () => isVisible.value,
  (value) => {
    emit("update:modelValue", value);
  }
);
</script>
