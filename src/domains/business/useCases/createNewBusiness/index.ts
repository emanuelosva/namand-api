import { IBusinessRepository, IInputBusiness } from '@business/entities'
import { errorTypes } from '@business/constants'
import { BusinessError } from '@business/businessError'
import logger from '@business/logger'
import { IAuth } from '@domains/authentication'

export interface ICreateNewBusinessDeps {
  findBusinessBySlug: IBusinessRepository['findBySlug'],
  findBusinessByEmail: IBusinessRepository['findByEmail'],
  createNewBusiness: IBusinessRepository['createOne'],
  slugGenerator: (value: string, newSlug?: boolean) => string,
  hashGenerator: (value: string) => Promise<string>
  createApiKey: (businessId: string) => Promise<IAuth>
}

export const makeCreateNewBusiness = ({
  findBusinessBySlug,
  findBusinessByEmail,
  createNewBusiness,
  slugGenerator,
  hashGenerator,
  createApiKey,
}: ICreateNewBusinessDeps,
) => async (businessDTO: IInputBusiness) => {
  logger.info(`Creating new business with email: ${businessDTO.email}`)

  let slug = businessDTO.slug || slugGenerator(businessDTO.name)

  const anotherWithEmail = await findBusinessByEmail(businessDTO.email)
  if (anotherWithEmail) {
    logger.error(`Error on createNewBusiness with email ${businessDTO.email} - email conflict`)
    throw new BusinessError(errorTypes.EMAIL_ALREADY_EXISTS, 409)
  }

  const anotherWithSlug = await findBusinessBySlug(slug)
  if (anotherWithSlug) {
    if (businessDTO.slug) {
      logger.error(`Error on createNewBusiness with email ${businessDTO.email} - slug conflict`)
      throw new BusinessError(errorTypes.SLUG_ALREADY_EXISTS, 409)
    }
    slug = `${slug}-${slugGenerator('', true)}`
  }

  businessDTO.slug = slug
  businessDTO.password = await hashGenerator(businessDTO.password)
  const business = await createNewBusiness(businessDTO)
  await createApiKey(business.id)

  return business
}
