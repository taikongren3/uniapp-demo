import { describe, expect, it } from 'vitest'
import { createAppEnv } from './env'

describe('createAppEnv', () => {
  it('normalizes the API base URL and timeout', () => {
    const result = createAppEnv(
      {
        VITE_API_BASE_URL: 'https://api.example.com///',
        VITE_APP_NAME: 'Test App',
        VITE_REQUEST_TIMEOUT: '3000',
      },
      'test',
    )

    expect(result.apiBaseUrl).toBe('https://api.example.com')
    expect(result.requestTimeout).toBe(3000)
    expect(result.isDevelopment).toBe(false)
  })

  it('rejects incomplete configuration', () => {
    expect(() => createAppEnv({ VITE_APP_NAME: 'Test App' })).toThrow(
      '缺少环境变量 VITE_API_BASE_URL',
    )
  })
})
