import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia) // <-- Подключаем Pinia перед использованием хранилищ
pinia.use(piniaPluginPersistedstate)
app.use(router)
app.mount('#app')