export interface AppEnv {
  apiBaseUrl: string
  appName: string
  isDevelopment: boolean
  mode: string
  requestTimeout: number
}

const DEFAULT_TIMEOUT = 15_000

function parsePositiveInteger(value: string | undefined, fallback: number): number {
  if (!value) return fallback
  const parsed = Number(value)
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback
}

export function createAppEnv(source: Partial<ImportMetaEnv>, mode = 'development'): AppEnv {
  const apiBaseUrl = source.VITE_API_BASE_URL?.trim()
  const appName = source.VITE_APP_NAME?.trim()

  if (!apiBaseUrl) {
    throw new Error('缺少环境变量 VITE_API_BASE_URL')
  }
  if (!appName) {
    throw new Error('缺少环境变量 VITE_APP_NAME')
  }

  return Object.freeze({
    apiBaseUrl: apiBaseUrl.replace(/\/+$/, ''),
    appName,
    isDevelopment: mode === 'development',
    mode,
    requestTimeout: parsePositiveInteger(source.VITE_REQUEST_TIMEOUT, DEFAULT_TIMEOUT),
  })
}

export const env = createAppEnv(import.meta.env, import.meta.env.MODE)
