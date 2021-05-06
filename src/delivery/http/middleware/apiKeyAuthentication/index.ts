import { httpStatus } from '@delivery/utils'
import { ApiError } from '@delivery/deliveryError'
import { authByApiKey } from '@authentication/index'
import { IBusiness } from '@business/index'
import logger from '@delivery/logger'

export const apiKeyAuthentication = async (request, reply) => {
  const key = request.headers['x-api-key']

  if (!key) {
    logger.warn(`Erro on apiKey authentication: no api header -> from: ${request.ip}`)
    throw new ApiError('INVALID_X-Api-Key_HEADER', httpStatus.unauthorized)
  }

  const apiKey = await authByApiKey(key as string)
  request.business = apiKey.business as IBusiness
}
