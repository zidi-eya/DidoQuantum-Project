<template>
  <q-popup-proxy
    class="column"
    cover
    transition-show="scale"
    transition-hide="scale"
    v-model="localShow"
  >
    <div class="row">
      <q-date
        v-model="internalDateTime"
        :mask="time? displayFormat.full() : displayFormat.date"
        flat
        today-btn
        first-day-of-week="1"
      />

      <q-time
        v-if="time"
        v-model="internalDateTime"
        :mask="displayFormat.full()"
        format24h
        flat
      />
    </div>
    <div class="row items-center justify-end q-mt-md">
      <q-btn v-close-popup label="Close" color="primary" flat />
    </div>
  </q-popup-proxy>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { date as qdate } from 'quasar'
import { DateTimeParser } from '@/utils/functions/datetime-parser'
import { usePreferenceStore } from '@/stores/user-preference-store';

const props = defineProps({
  date: Date,
  show: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (e: 'update:date', v: Date): void;
  (e: 'update:show', v: boolean): void;
}>();

const userPreferenceStore = usePreferenceStore();

const displayFormat = ref(userPreferenceStore.language.date_format)

const internalDateTime = ref(qdate.formatDate(props.date, displayFormat.value.full()))

const localShow = ref(props.show)

watch(localShow, (newVal) => {
  emit('update:show', newVal);
});

watch(internalDateTime, (newVal) => {
  const result = DateTimeParser(newVal, displayFormat.value)
  if(!isNaN(result.getDate())) {
    emit('update:date', result);
  }
});

watch(
  () => props.date,
  (newVal) => {
    internalDateTime.value = qdate.formatDate(newVal, displayFormat.value.full())
  }, {
    deep: true
  }
);
</script>
