export interface ApiEnvelope<T> {
  code: number
  data: T
  message?: string
}

export interface RequestOptions {
  data?: UniNamespace.RequestOptions['data']
  header?: Record<string, string>
  method?: UniNamespace.RequestOptions['method']
  showErrorToast?: boolean
  timeout?: number
}
