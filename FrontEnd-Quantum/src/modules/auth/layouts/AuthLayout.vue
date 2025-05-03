<template>
  <q-layout class="row">
    <q-page-container class="col relative-position">
      <q-page class="absolute-center column justify-center">
      <router-view />
        <q-list class="row  row justify-center q-mb-lg">
          <q-item class="text-grey-7" clickable> Terms & Conditions </q-item>
          <q-item class="text-grey-7" clickable> Privacy Policy </q-item>
          <q-item    tag="router-link"
          :to="{ name: 'contact' }" class="text-grey-7" clickable> Contact Us </q-item>
          <q-item
          tag="router-link"
          :to="{ name: 'about' }"

          class="text-grey-7" clickable> About Us </q-item>
        </q-list>
      </q-page>
    </q-page-container>
    <section
      class="bg-primary column relative-position col shadow-24 gt-md"
      style="
        background-image: url('/image/SI.png') !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        background-size: cover !important;
      "
    >
      <div class="bg-primary full-width full-height" style="opacity: 0.1" />
    </section>
  </q-layout>
</template>
<script setup lang="ts">
import { QItem, QList,QPage, QPageContainer,QLayout } from 'quasar'

</script>
