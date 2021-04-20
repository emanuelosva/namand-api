import { BusinessError as BusinessErrorBase } from '@common/index'
import config from '@business/config'

export class BusinessError extends BusinessErrorBase {
  constructor(
    public message: string,
    public status: number = 500,
    public metadata: Record<string, any> = {},
  ) {
    super(config.moduleName, message, status, metadata)

    Error.captureStackTrace(this, this.constructor)
  }
}
