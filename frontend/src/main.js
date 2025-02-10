import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
const app = createApp(App)
const GOOGLE_CID = import.meta.env.VITE_GOOGLE_CLIENT_ID
app.use(router)

app.use(vue3GoogleLogin, {
  clientId: GOOGLE_CID
})

app.mount('#app')