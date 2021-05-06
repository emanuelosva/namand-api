import { getEnv } from '@common/index'

export default {
  moduleName: 'api-gateway',
  PORT: getEnv.number('PORT', 3000),
  IS_PRODUCTION: getEnv.string('NODE_ENV', 'development') === 'production',
  CORS_ORIGINS: getEnv.array.ofString('CORS_ORIGINS', ['*']),
  MAX_REQUEST_PER_MINUTE: getEnv.number('MAX_REQUEST_PER_MINUTE', 60),
}
