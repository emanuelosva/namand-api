import { IBusinessRepository, IInputBusiness } from '../../entities'
import { errorTypes } from '../../constants'
import { BusinessError } from '../../businessError'
import logger from '../../logger'

export interface ICreateNewBusinessDeps {
  findBusinessBySlug: IBusinessRepository['findBySlug'],
  findBusinessByEmail: IBusinessRepository['findByEmail'],
  createNewBusiness: IBusinessRepository['createOne'],
  slugGenerator: (value: string, newSlug?: boolean) => string,
  hashGenerator: (value: string) => Promise<string>
}

export const makeCreateNewBusiness = ({
  findBusinessBySlug,
  findBusinessByEmail,
  createNewBusiness,
  slugGenerator,
  hashGenerator,
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

  return business
}
