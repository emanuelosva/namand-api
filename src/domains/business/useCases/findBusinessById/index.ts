import { IBusinessRepository } from '@business/entities'
import { errorTypes } from '@business/constants'
import { BusinessError } from '@business/businessError'
import logger from '@business/logger'

export const makeFindBusinessById = (
  findBusinessById: IBusinessRepository['findById'],
) => async (id: string) => {
  logger.info(`Finding business with identifier: ${id}`)

  const business = await findBusinessById(id)

  if (!business) {
    logger.error(`Error on findBusinessById: ${id} - not found`)
    throw new BusinessError(errorTypes.BUSINESS_NOT_FOUND, 404)
  }

  return business
}
