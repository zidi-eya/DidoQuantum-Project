<template>
  <q-dialog v-model="isVisible">
    <q-card
      class="collection-picker rounded-sm q-pa-md column full-width"
      style="max-width: 35rem"
    >
      <q-card-section>
        <div
          class="text-h6"
          style="text-align: center; font-family: 'Roboto', sans-serif"
        >
Upload File        </div>
      </q-card-section>

      <q-card-section class="q-pt-none col-grow column q-gutter-sm">
        <q-form
          greedy
          id="create-report-form"
          class="column q-gutter-md"
          @submit.prevent="send"
        >
        <q-input
        class="full-width"
        filled
        label="Details"
        v-model="name"
        lazy-rules="ondemand"
        :rules="GeneralRules.fieldRequired('Please enter a message')"
      >
        <template v-slot:prepend>
          <q-icon name="Name" />
        </template>
      </q-input>
          <q-input
            class="styled-textarea"
            filled
            type="textarea"
            label="Details"
            v-model="message"
            lazy-rules="ondemand"
          >
            <template v-slot:prepend>
              <q-icon name="description" />
            </template>
          </q-input>

          <q-file
            class="custom-uploader"
            filled
            v-model="file"
            accept="*"
            hide-bottom-space
            :max-total-size="DocumentFileSize"
            label-color="primary"
            standout="white"
            @rejected="onRejected"
          >
            <div class="flex justify-center items-center full-width">
              <span class="text-primary text-body2 text-weight-medium"
                >Upload File</span
              >
              <q-icon name="upload" color="primary" size="sm" class="q-ml-sm" />
            </div>
          </q-file>

          <div class="col-sm-6 col-auto">
            <span class="text-grey-7 text-caption">
              You can upload any file type
            </span>
            <br />

            <span class="text-weight-medium">{{ file?.name || '' }}</span>
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" no-caps @click="cancel" />
        <q-btn
          flat
          label="Confirm"
          no-caps
          class="bg-primary text-white text-body2 text-weight-medium q-py-sm-sm q-py-sm q-px-sm-xl"
          rounded
          type="submit"
          form="create-report-form"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref, watch } from 'vue';
import { GeneralRules } from '@/utils/validation/rules';
import {  QCard , QBtn, QCardSection, QIcon, QInput, QCardActions, QForm,QDialog, QFile } from 'quasar';
import { uploadFile } from '@/modules/Upload_files/service/uploadService';

const DocumentFileSize = import.meta.env.TEXT_FILE_SIZE;
const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void;
}>();
const message = ref('');
const name = ref('');

const file = ref<File>();
interface ReportOption {
  label: string;
  value: string;
}
const reportOptions: ReportOption[] = [
  { label: 'Bug', value: 'bug' },
  { label: 'Suggestion', value: 'suggestion' },
];
const isVisible = ref(false);
const $q = useQuasar();

function cancel() {
  isVisible.value = false;
  message.value = '';
}

async function send(): Promise<any> {
  if (!file.value) {
    $q.notify({ type: 'negative', message: 'Please select a file first.' });
    return;
  }

  try {
    const response = await uploadFile(file.value);
    $q.notify({ type: 'positive', message: 'File uploaded successfully!' });
    console.log('Upload response:', response);
    cancel();
  } catch (error) {
    console.error('Upload error:', error);
    $q.notify({ type: 'negative', message: 'Failed to upload file.' });
  }
}


function onRejected() {
  $q.notify({
    type: 'negative',
    message: 'File is too big',
  });
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
    emit('update:modelValue', value);
  }
);
</script>
