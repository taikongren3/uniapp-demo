import { createPinia } from 'pinia'
import { createSSRApp } from 'vue'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()

  app.use(pinia)
  app.config.errorHandler = (error, instance, info) => {
    console.error('[Vue error]', { error, info, instance })
  }

  return { app, pinia }
}
