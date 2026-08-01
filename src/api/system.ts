import { request } from '@/services/http'

export interface HealthStatus {
  status: 'ok'
  timestamp: string
}

export function getHealthStatus(): Promise<HealthStatus> {
  return request<HealthStatus>('/health', {
    showErrorToast: false,
  })
}
