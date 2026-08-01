import { env } from '@/config/env'
import { storage } from '@/shared/storage'
import { HttpError } from './error'
import type { ApiEnvelope, RequestOptions } from './types'

const ACCESS_TOKEN_KEY = 'auth.accessToken'

export function joinUrl(baseUrl: string, path: string): string {
  if (/^https?:\/\//.test(path)) return path
  return `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`
}

function notifyError(message: string): void {
  uni.showToast({
    title: message || '请求失败，请稍后重试',
    icon: 'none',
  })
}

export function request<TResponse>(path: string, options: RequestOptions = {}): Promise<TResponse> {
  const token = storage.get(ACCESS_TOKEN_KEY, '')
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...options.header,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url: joinUrl(env.apiBaseUrl, path),
      method: options.method ?? 'GET',
      data: options.data,
      header: headers,
      timeout: options.timeout ?? env.requestTimeout,
      success: (response) => {
        const statusCode = response.statusCode
        const body = response.data as ApiEnvelope<TResponse>

        if (statusCode < 200 || statusCode >= 300) {
          const error = new HttpError(body?.message || `HTTP ${statusCode}`, statusCode)
          if (options.showErrorToast !== false) notifyError(error.message)
          reject(error)
          return
        }

        if (!body || typeof body.code !== 'number') {
          const error = new HttpError('服务端响应格式不正确', statusCode)
          if (options.showErrorToast !== false) notifyError(error.message)
          reject(error)
          return
        }

        if (body.code !== 0) {
          const error = new HttpError(body.message || '业务处理失败', statusCode, body.code)
          if (options.showErrorToast !== false) notifyError(error.message)
          reject(error)
          return
        }

        resolve(body.data)
      },
      fail: (cause) => {
        const error = new HttpError(cause.errMsg || '网络请求失败', 0, undefined, { cause })
        if (options.showErrorToast !== false) notifyError(error.message)
        reject(error)
      },
    })
  })
}

export type { ApiEnvelope, RequestOptions } from './types'
export { HttpError } from './error'
