<template>
  <q-dialog v-model="visible">
    <div class="welcome-container">
      <div class="welcome-card">
        <div class="icon-container">
          <img src="/image/qtpulse.webp" alt="Rocket Icon" class="rocket-icon" />
        </div>

        <h1
          style="
            font-size: 2rem;
            line-height: 2.5rem;
            font-family: 'Poppins', 'Inter', 'Avenir', sans-serif;
          "
        >
          {{ authStore.getUser?.fullName }}

          <span class="wave">👋</span>
        </h1>
        <h2
          style="
            font-size: 2rem;
            line-height: 2.5rem;
            font-family: 'Poppins', 'Inter', 'Avenir', sans-serif;
          "
        >
          Welcome to <span style="color: #4292c6">Dido Quantum Pulse!</span>
        </h2>

        <h6
        style="
          font-size: 2rem;
          line-height: 2.5rem;
          font-family: 'Poppins', 'Inter', 'Avenir', sans-serif;
        "
      >
        as  <span style="color: #00F">Startup member!</span>
      </h6>


        <p>
          You now have 14 days of free trial access to explore all the features and
          benefits of our platform. If you need any assistance, <br />
          <a href="https://didoquantumpulse.com/" target="_blank" class="help-link"
            >visit our help center.</a
          >
        </p>
        <p style="color: #4292c6">Enjoy using Dido Quantum Pulse!</p>
        <br />

        <q-btn
          label="Get started"
          color="primary"
          @click="router.push('/profile')"
          style="margin-bottom: 20px; border-radius: 20px"
        />
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useAuthStore } from "@/modules/auth/stores/auth-store";
import {QDialog , QBtn } from 'quasar'
import RouteNames from '@/router/RoutePrefixes'
import { useRouter } from 'vue-router';

  const router = useRouter();

const authStore = useAuthStore();

const visible = ref(true);
const emit = defineEmits(["close"]);

function close() {
  router.push('/profile')
}
</script>

<style>
/* styles.css */
body {
  font-family: "Arial", sans-serif;
  background-color: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.welcome-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.welcome-card {
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 700px; /* Adjust this width if needed */
  height: auto; /* Let the height adjust automatically based on content */
  overflow: hidden; /* Prevent scrolling */
  position: relative;
}

.icon-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.rocket-icon {
  width: 150px;
  height: 150px;
}

h1 {
  color: #333;
  margin: 0;
  font-family: "Poppins", "Inter", "Avenir", sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
}

.wave {
  display: inline-block;
  animation: wave-animation 2s infinite;
  transform-origin: 70% 70%;
  display: inline-block;
}

@keyframes wave-animation {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(30deg);
  }
}

h2 {
  font-size: 18px;
  color: #333;
  margin: 10px 0;
}

p {
  font-size: 16px;
  color: #666;
  margin: 20px 0;
}

.get-started-btn {
  background-color: #635bff;
  color: #fff;
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.get-started-btn:hover {
  background-color: #504bb5;
}

/* Background pattern */
.welcome-card::before {
  content: "";
  position: absolute;
  top: -15px;
  left: -15px;
  background-image: url("https://codetheweb.blog/assets/img/posts/css-advanced-background-images/cover.jpg");
  width: 100px;
  height: 100px;
  opacity: 0.1;
  z-index: -1;
}
</style>
