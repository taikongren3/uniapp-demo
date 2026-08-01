export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const value = uni.getStorageSync(key) as T | undefined
      return value ?? fallback
    } catch (error) {
      console.warn(`[storage] read failed: ${key}`, error)
      return fallback
    }
  },

  set<T>(key: string, value: T): boolean {
    try {
      uni.setStorageSync(key, value)
      return true
    } catch (error) {
      console.warn(`[storage] write failed: ${key}`, error)
      return false
    }
  },

  remove(key: string): void {
    try {
      uni.removeStorageSync(key)
    } catch (error) {
      console.warn(`[storage] remove failed: ${key}`, error)
    }
  },
}
