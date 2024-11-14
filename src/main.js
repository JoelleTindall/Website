import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import { useAuthStore } from './auth'
createApp(App).use(router, useAuthStore).mount('#app')
