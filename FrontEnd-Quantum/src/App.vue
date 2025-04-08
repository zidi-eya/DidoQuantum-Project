<template>
  <!--<sidebar /> -->
  <router-view />
  <h1>je suis  app.vue</h1>
  <div>
    <button
      class="text-bold text-primary cursor-pointer"
      @click="router.push({ name: RoutePrefixes.INDEX })"
    >
      Create an Account
  </button>
  </div>
</template>


<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>


<script setup lang="ts">
//import 'reflect-metadata';
import { onMounted, watch } from 'vue';
import { eventsObservable } from './utils/functions/observer-pattern';
import RouteNames from '@/modules/auth/router/RouteNames';
import { useRouter } from 'vue-router';
import RoutePrefixes from '@/router/RoutePrefixes';

//import { useSocialMediaStore } from '@/modules/tools/stores/sm-store';
import { useAuthStore } from '@/modules/auth/stores/auth-store';
import { RouterLink, RouterView } from "vue-router";
import sidebar from "./components/sidebar.vue";

const router = useRouter();

//const smStore = useSocialMediaStore();
let intervalId: NodeJS.Timeout | undefined;
let websocket: WebSocket | undefined;

const authStore = useAuthStore();

watch(
  () => authStore.isLoggedIn,
  () => {
    if (!authStore.isLoggedIn) {
      disconnectWebSocket();
    } else {
      connectWebSocket();
    }
  }
);

// Function to establish WebSocket connection and set up event listeners
function connectWebSocket() {
  websocket = new WebSocket(`${process.env.API_WEBSOCKET_URL}/ws`);

  websocket.onopen = () => {
    intervalId = setInterval(() => {
      websocket?.send(JSON.stringify({ type: 'ping' }));
    }, 10000);
  };

  websocket.onmessage = (ev) => {
    const data = JSON.parse(ev.data);
    switch (data.type) {
      case 'data': {
        eventsObservable.notifyObserver(data.message);
        break;
      }
      default:
        break;
    }
  };

  websocket.onclose = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    // Attempt to reconnect after a delay
    setTimeout(() => {
      connectWebSocket();
    }, 5000); // Reconnect after 5 seconds
  };

  websocket.onerror = (error) => {
    console.error('WebSocket error:', error);
    // Close the websocket explicitly on error to trigger the onclose event
    websocket?.close();
  };
}

function disconnectWebSocket() {
  if (websocket) {
    websocket.close();
  }
}

onMounted(async () => {
//  await smStore.init();
  // connectWebSocket();
});
</script>
