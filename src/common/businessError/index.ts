export class BusinessError extends Error {
  constructor(
    public moduleName: string,
    public message: string,
    public status: number = 500,
    public metadata: Record<string, any> = {},
  ) {
    super(message)
    this.moduleName = moduleName
    this.message = message
    this.status = status
    this.metadata = metadata

    Error.captureStackTrace(this, this.constructor)
  }

  toJSON() {
    return {
      message: this.message,
      status: this.status,
      meta: this.metadata,
      ...(process.env.NODE_ENV !== 'production' && { stack: this.stack }),
    }
  }
}
