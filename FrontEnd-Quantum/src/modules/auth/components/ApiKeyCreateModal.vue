<template>
  <q-dialog v-model="isVisible" persistent>
    <q-card
      class="collection-picker rounded-sm q-pa-md column full-width"
      style="max-width: 50rem"
    >
      <q-card-section>
        <div class="text-h6 text-center">Create New API Key</div>
      </q-card-section>

      <q-card-section class="q-pt-none col-grow column q-gutter-sm">
        <q-form
          greedy
          id="create-api-key-form"
          class="column q-gutter-md"
          @submit.prevent="create"
        >
          <q-input
            v-model="name"
            label="Name"
            dense
            outlined
            color="primary"
            lazy-rules="ondemand"
            :rules="
              GeneralRules.fieldRequired('Please enter a name for the API key')
            "
            hide-bottom-space
          >
            <template v-slot:prepend>
              <q-icon name="eva-text-outline" />
            </template>
          </q-input>

          <date-picker-input
            v-model="date"
            dense
            outlined
            color="primary"
            label="Expiration Date"
            lazy-rules="ondemand"
            :rules="GeneralRules.optionalField(GeneralRules.date)"
            hide-bottom-space
          />
        </q-form>

        <div v-if="promptValue === undefined">
          <div class="text-caption">Permissions</div>
          <div class="row">
            <q-checkbox v-model="prompt" label="Prompt" />
          </div>
        </div>

        <div>
          <div class="text-caption">Scope</div>
          <q-toggle v-model="allCollections" label="All collections" />
          <collection-picker
            v-if="!allCollections"
            v-model="collectionsIds"
            class="q-mt-md"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" no-caps v-close-popup />
        <q-btn
          flat
          label="Create"
          no-caps
          class="bg-primary text-white"
          type="submit"
          form="create-api-key-form"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ApiKey } from '@/modules/auth/models/api';
import apiService from '@/modules/auth/services/ApiService';
//import DatePickerInput from '@/components/DatePickerInput.vue';
//import CollectionPicker from '@/modules/knowledge-base/components/CollectionPicker.vue';
import { GeneralRules } from '@/utils/validation/rules';

const props = defineProps({
  modelValue: Boolean,
  promptValue: Boolean,
});

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void;
  (e: 'create', v: ApiKey): void;
}>();

const isVisible = ref(false);
const name = ref('');
const date = ref<Date | undefined>();
const prompt = ref(false);
const allCollections = ref(true);
const collectionsIds = ref<number[] | undefined>();

function close() {
  isVisible.value = false;
  name.value = '';
  date.value = undefined;
  prompt.value = false;
  allCollections.value = true;
  collectionsIds.value = undefined;
}

async function create() {
 /* const apiKey = await apiService.createAPIKey(
    name.value,
    props.promptValue ?? prompt.value,
    allCollections.value ? undefined : collectionsIds.value,
    date.value
  );
  emit('create', apiKey);
  close();*/
}

watch(
  () => props.modelValue,
  (newVal) => {
    isVisible.value = newVal;
  }
);
watch(isVisible, (newVal) => {
  emit('update:modelValue', newVal);
});
</script>
