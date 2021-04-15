import { IBusinessRepository } from '../../entities'
import { errorTypes } from '../../constants'
import { BusinessError } from '../../businessError'
import logger from '../../logger'

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
