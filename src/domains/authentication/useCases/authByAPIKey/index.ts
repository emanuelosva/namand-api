import { AuthError } from '@authentication/authError'
import { errorTypes } from '@authentication/constants'
import { IAuthRepository } from '@authentication/entities'
import logger from '@authentication/logger'

export const makeAuthByAPIKey = (
  findByApiKey: IAuthRepository['findByApiKey'],
) => async (key: string) => {
  logger.info(`Finding apiKey for with key: ${key}`)

  const apiKey = await findByApiKey(key)

  if (!apiKey) {
    logger.error(`Error on findAPIKeyByKey: ${key} - not found`)
    throw new AuthError(errorTypes.INVALID_AUTHENTICATION, 401)
  }

  return apiKey
}
