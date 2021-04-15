import { IBusinessRepository } from '../../entities'
import { errorTypes } from '../../constants'
import { BusinessError } from '../../businessError'
import logger from '../../logger'

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
