<template>
  <div class="row q-gutter-lg">
    <div class="col column q-gutter-md" style="margin-left:0px;">
      <profile-detail />
      <change-password />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileDetail from '@/modules/profile/components/ProfileDetail.vue';
import ChangePassword from '@/modules/profile/components/ChangePassword.vue';
</script>
