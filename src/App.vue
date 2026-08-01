<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'
import { env } from '@/config/env'
import { useAppStore } from '@/stores/app'

onLaunch(() => {
  useAppStore().initializeNetworkListener()

  if (env.isDevelopment) {
    console.info(`[app] ${env.appName} started in ${env.mode} mode`)
  }
})
</script>

<style lang="scss">
page {
  min-height: 100%;
  background: $uni-bg-color-grey;
  color: $uni-text-color;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

button::after {
  border: 0;
}
</style>
