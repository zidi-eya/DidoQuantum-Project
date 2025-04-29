import '@/css/app.scss';
//mport '@quasar/extras/material-icons/material-icons.css';
//import 'quasar/src/css/index.sass';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { route } from 'quasar/wrappers'
import 'quasar/src/css/index.sass' // make sure you load Quasar CSS


import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import {  Quasar, Dialog, Notify, Loading, ClosePopup  } from 'quasar'
import iconSet from 'quasar/icon-set/material-icons'
import lang from 'quasar/lang/en-US'

import App from './App.vue'
import router from './router'

async function bootstrap() {
  const app = createApp(App)

  app.use(Quasar, {
    plugins: {
      Dialog,
      Notify,
      Loading
    },
    directives: {
      ClosePopup
    },
    iconSet,
    lang
  })
  app.use(createPinia())

  const resolvedRouter = await router()
  app.use(resolvedRouter)

  app.mount('#app')
  console.log('App loaded!')


  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);

  app.use(pinia);

}

bootstrap()


