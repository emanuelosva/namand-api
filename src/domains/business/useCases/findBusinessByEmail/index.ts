import { IBusinessRepository } from '../../entities'
import { errorTypes } from '../../constants'
import { BusinessError } from '../../businessError'
import logger from '../../logger'

export const makeFindBusinessByEmail = (
  findBusinessByEmail: IBusinessRepository['findByEmail'],
) => async (email: string) => {
  logger.info(`Finding business with email: ${email}`)

  const business = await findBusinessByEmail(email)

  if (!business) {
    logger.error(`Error on findBusinessByemail: ${email} - not found`)
    throw new BusinessError(errorTypes.BUSINESS_NOT_FOUND, 404)
  }

  return business
}
