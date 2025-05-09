<template>
  <!--<sidebar />
    <router-view />

 -->
  <RouterView />
</template>






<script setup lang="ts">
import 'reflect-metadata';
import {  watch , onMounted} from 'vue';
import { eventsObservable } from './utils/functions/observer-pattern';
import { useAuthStore } from '@/modules/auth/stores/auth-store';

let intervalId: NodeJS.Timeout | undefined;
let websocket: WebSocket | undefined;

const authStore = useAuthStore();

watch(
  () => authStore.isLoggedIn,
  () => {
    if (!authStore.isLoggedIn) {
      disconnectWebSocket();
    } else if (authStore.isLoggedIn) {
      connectWebSocket();
    }
  }
);

// Function to establish WebSocket connection and set up event listeners
function connectWebSocket() {
  console.log('[🌐] Connecting WebSocket');

  //websocket = new WebSocket(`${import.meta.env.API_WEBSOCKET_URL}/ws`);
  websocket = new WebSocket(`${import.meta.env.VITE_API_WEBSOCKET_URL}/ws`);

  console.log('WebSocket URL:', import.meta.env.VITE_API_WEBSOCKET_URL);

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
      // Attempt to reconnect after a delay
    }
  };

  websocket.onerror = (error) => {
    console.error('WebSocket error:', error);
    // Close the websocket explicitly on error to trigger the onclose event
    websocket?.close();
     // Attempt to reconnect after a delay
    setTimeout(() => {
      connectWebSocket();
    }, 5000); // Reconnect after 5 seconds
  };
}

function disconnectWebSocket() {
  if (websocket) {
    if (intervalId) {
      clearInterval(intervalId);
    }
    websocket.close();
  }
}
watch(
  () => authStore.isLoggedIn,
  (isLoggedIn) => {
    console.log('🌀 authStore.isLoggedIn changed:', isLoggedIn);
    if (!isLoggedIn) {
      disconnectWebSocket();
    } else {
      connectWebSocket();
    }
  },
  { immediate: true }
);

onMounted(() => {
  window.addEventListener('user-logged-out', () => {
    disconnectWebSocket();
  });
});

onMounted(() => {
  if (localStorage.getItem('token')) {
    authStore.reloadUser()
  }
});

</script>



