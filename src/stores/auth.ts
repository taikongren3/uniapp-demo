import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { storage } from '@/shared/storage'

const ACCESS_TOKEN_KEY = 'auth.accessToken'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(storage.get(ACCESS_TOKEN_KEY, ''))
  const isAuthenticated = computed(() => Boolean(accessToken.value))

  function setAccessToken(token: string) {
    accessToken.value = token
    storage.set(ACCESS_TOKEN_KEY, token)
  }

  function clearSession() {
    accessToken.value = ''
    storage.remove(ACCESS_TOKEN_KEY)
  }

  return {
    accessToken,
    clearSession,
    isAuthenticated,
    setAccessToken,
  }
})
