<template>
  <q-input v-bind="$attrs" v-model="internalDateTime" debounce="500">
    <template v-slot:prepend>
      <q-icon name="eva-calendar-outline" />
    </template>

    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer" />
      <date-picker v-model:show="showCalendar" v-model:date="internalDate" :time="time"/>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { date as qdate } from 'quasar';
import { usePreferenceStore } from '@/stores/user-preference-store';
import DatePicker from '@/components/DatePicker.vue';

const props = defineProps({
  modelValue: Date,
  time: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (e: 'update:modelValue', v: Date): void;
}>();

const userPreferenceStore = usePreferenceStore();

const displayFormat = ref(userPreferenceStore.language.date_format);

const internalDate = ref(props.modelValue);

const internalDateTime = ref(
  qdate.formatDate(
    props.modelValue,
    props.time ? displayFormat.value.full() : displayFormat.value.date
  )
);

const showCalendar = ref(false);

watch(internalDate, (newVal) => {
  if (newVal) {
    internalDateTime.value = qdate.formatDate(
      newVal,
      props.time ? displayFormat.value.full() : displayFormat.value.date
    );
    emit('update:modelValue', newVal);
  }
});
</script>
