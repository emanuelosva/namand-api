import { IBusinessRepository } from '@business/entities'
import { errorTypes } from '@business/constants'
import { BusinessError } from '@business/businessError'
import logger from '@business/logger'

export const makeFindBusinessBySlug = (
  findBusinessBySlug: IBusinessRepository['findBySlug'],
) => async (slug: string) => {
  logger.info(`Finding business with slug: ${slug}`)

  const business = await findBusinessBySlug(slug)

  if (!business) {
    logger.error(`Error on findBusinessBySlug: ${slug} - not found`)
    throw new BusinessError(errorTypes.BUSINESS_NOT_FOUND, 404)
  }

  return business
}
