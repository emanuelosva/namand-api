import { AuthError } from '@authentication/authError'
import { errorTypes } from '@authentication/constants'
import { IAuthRepository, IAuth } from '@authentication/entities'
import logger from '@authentication/logger'

export interface IUpdateAPIKeyDeps {
  findByAPIKey: IAuthRepository['findByApiKey']
  updateAPIKey: IAuthRepository['updateOne']
  keyGenerator: () => string
}

export const makeUpdateAPIKey = ({
  findByAPIKey,
  updateAPIKey,
  keyGenerator,
}: IUpdateAPIKeyDeps) => async (key: string, businessId: string) => {
  logger.info(`Updating apiKey for business: ${businessId}`)

  const apiKey = (key && await findByAPIKey(key)) as IAuth
  const isBusinessOwner = apiKey && businessId === apiKey.businessId

  if (!isBusinessOwner) {
    logger.error(`Error on updateAPIKey for key: ${key} and businessId: ${businessId}`, { apiKey, businessId })
    throw new AuthError(errorTypes.INVALID_AUTHENTICATION, 401)
  }

  const newKey = keyGenerator()
  return await updateAPIKey(apiKey.key, newKey)
}
