import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isOnline = ref(true)

  function initializeNetworkListener() {
    uni.getNetworkType({
      success: ({ networkType }) => {
        isOnline.value = networkType !== 'none'
      },
    })

    uni.onNetworkStatusChange(({ isConnected }) => {
      isOnline.value = isConnected
    })
  }

  return {
    initializeNetworkListener,
    isOnline,
  }
})
