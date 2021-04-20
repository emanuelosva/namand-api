import { AuthError } from '@authentication/authError'
import { errorTypes } from '@authentication/constants'
import { IAuthRepository } from '@authentication/entities'
import logger from '@authentication/logger'

export interface ICreateAPIKeyDeps {
  createAuth: IAuthRepository['createOne']
  findByBusinessId: IAuthRepository['findByBusinessId']
  keyGenerator: () => string
}

export const makeCreateAPIKey = ({
  createAuth,
  findByBusinessId,
  keyGenerator,
}: ICreateAPIKeyDeps) => async (businessId: string) => {
  logger.info(`Creating or gettings apiKey for business: ${businessId}`)

  if (!businessId) {
    logger.error('Error on createAPIKey: businessId no provided')
    throw new AuthError(errorTypes.BUSINESS_ID_IS_NEEDED, 400)
  }

  const existingApiKey = await findByBusinessId(businessId)
  if (existingApiKey) return existingApiKey

  const key = keyGenerator()
  const apiKey = await createAuth(businessId, key)
  return apiKey
}
