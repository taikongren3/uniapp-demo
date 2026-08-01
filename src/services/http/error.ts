export class HttpError extends Error {
  constructor(
    message: string,
    public readonly statusCode = 0,
    public readonly businessCode?: number,
    options?: ErrorOptions,
  ) {
    super(message, options)
    this.name = 'HttpError'
  }
}
