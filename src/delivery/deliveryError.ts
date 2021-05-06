import { BusinessError as BusinessErrorBase } from '@common/index'
import config from '@delivery/config'

export class ApiError extends BusinessErrorBase {
  constructor(
    public message: string,
    public status: number = 500,
    public metadata: Record<string, any> = {},
  ) {
    super(`${config.moduleName}-rest`, message, status, metadata)

    Error.captureStackTrace(this, this.constructor)
  }
}

export class GqlError extends BusinessErrorBase {
  constructor(
    public message: string,
    public status: number = 500,
    public metadata: Record<string, any> = {},
  ) {
    super(`${config.moduleName}-gql`, message, status, metadata)

    Error.captureStackTrace(this, this.constructor)
  }
}
