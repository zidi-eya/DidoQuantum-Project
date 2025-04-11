<template>
  <div class="container">
    <nav class="nav">
      <a @click="changeSection('etudiant')">Esprit</a>
      <a @click="changeSection('parents')">AI researchers</a>
      <a @click="changeSection('enseignants')">startups</a>
      <a @click="changeSection('administration')">Engineers & developers</a>
    </nav>

    <div class="main-content">
      <div class="left-section">
        <h4>Dido Quantum Pulse is a cutting-edge AI-powered innovation platform that connects researchers, enterprises, and government agencies to accelerate breakthroughs in artificial intelligence, quantum computing, and cybersecurity.</h4>
        <img
          src="/home/eya/Dido-Quantum/FrontEnd-Quantum/public/image/qtpulse.webp"
          alt="Lecture Image"
          class="lecture-img"
        />
      </div>
      <div class="right-section">
        <div v-if="selectedSection === 'etudiant'">
          <h2>Esprit Student Space</h2>
          <p>Protégez vos données personnelles. Si vous utilisez un ordinateur public ou partagé, évitez de quitter le navigateur à la fin de votre session.</p>
          <input type="text" placeholder="Email" class="input-text" />
          <input type="text" placeholder="Password" class="input-text" />
          <button class="btn" @click="goToListUser">Sign In</button>
        </div>

        <div v-else-if="selectedSection === 'parents'">
          <h2>AI Researchers Space</h2>
          <p>Protégez vos données personnelles. Si vous utilisez un ordinateur public ou partagé, évitez de quitter le navigateur à la fin de votre session.</p>
          <input type="text" placeholder="Email" class="input-text" />
          <input type="text" placeholder="Password" class="input-text" />
          <button class="btn" @click="goToListUser">Sign In</button>
        </div>

        <div v-else-if="selectedSection === 'enseignants'">
          <h2>Startups Space</h2>
          <p>Protégez vos données personnelles. Si vous utilisez un ordinateur public ou partagé, évitez de quitter le navigateur à la fin de votre session.</p>
          <input type="text" placeholder="Email" class="input-text" />
          <input type="text" placeholder="Password" class="input-text" />
          <button class="btn" @click="goToListUser">Sign In</button>
        </div>

        <div v-else-if="selectedSection === 'administration'">
          <h2>Engineers & Developers Space</h2>
          <p>Protégez vos données personnelles. Si vous utilisez un ordinateur public ou partagé, évitez de quitter le navigateur à la fin de votre session.</p>
          <input type="text" placeholder="Email" class="input-text" />
          <input type="text" placeholder="Password" class="input-text" />
          <button class="btn" @click="goToListUser">Sign In</button>
          <span
          class="text-bold text-primary cursor-pointer"
          @click="router.push({ name: RouteNames.FORGOT_PASSWORD })"
        >
          Forgot password?
        </span>
        </div>
      </div>
        </div>
  </div>
</template>

<script setup>
import { ref, watch  } from "vue";
import { useRouter } from 'vue-router';
import RoutePrefixes from '@/router/RoutePrefixes';
import RouteNames from '@/modules/auth/router/RouteNames';

const router = useRouter();
const selectedSection = ref("etudiant");

const goToListUser = () => {
  console.log("Navigating to /ListUser"); // Debug log
  router.push('/ListUser');
};

// Watcher pour détecter les changements de selectedSection
watch(selectedSection, (newSection, oldSection) => {
  console.log(`Section changée de "${oldSection}" à "${newSection}"`);
});

// Fonction pour changer de section au clic
const changeSection = (section) => {
  selectedSection.value = section;
};


</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #FFF;
}

.nav {
  background-color: #e0e0e0;
  padding: 10px;
  display: flex;
  justify-content: center;
  border-radius: 5px;

}
.nav a {
  margin: 0 75px;
  text-decoration: none;
  color: #333;
  font-weight: bold;
  justify-content: center;


}
.main-content {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
.left-section,
.right-section {
  background-color: #e0e0e0;
  padding: 20px;
  border-radius: 5px;
  width: 1080%;
}
.lecture-img {
  width: 90%;
}
.input-text {
  width: 80%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.btn {
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
</style>
