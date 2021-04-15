import { IBusinessRepository, IUpdateBusiness } from '../../entities'
import { errorTypes } from '../../constants'
import { BusinessError } from '../../businessError'
import logger from '../../logger'

export interface IUpdateNewBusinessDeps {
  findBusinessBySlug: IBusinessRepository['findBySlug'],
  findBusinessByEmail: IBusinessRepository['findByEmail'],
  updateBusiness: IBusinessRepository['updateOne'],
  slugGenerator: (value: string, newSlug?: boolean) => string,
}

export const makeUpdateBusiness = ({
  findBusinessBySlug,
  findBusinessByEmail,
  updateBusiness,
  slugGenerator,
}: IUpdateNewBusinessDeps,
) => async (id: string, businessDTO: IUpdateBusiness) => {
  logger.info(`Updating a business with id: ${id}`)

  const { name, email, slug } = businessDTO

  const anotherWithEmail = email && await findBusinessByEmail(email)
  if (anotherWithEmail) {
    logger.error(`Error on updateBusiness with email ${email} - email conflict`)
    throw new BusinessError(errorTypes.EMAIL_ALREADY_EXISTS, 409)
  }

  const slugFromName = name && slugGenerator(name)
  let newSlug = slug || slugFromName as string
  const anotherWithSlug = newSlug && await findBusinessBySlug(newSlug)
  if (anotherWithSlug) {
    if (slug) {
      logger.error(`Error on updateBusiness with id ${id} - slug conflict`)
      throw new BusinessError(errorTypes.SLUG_ALREADY_EXISTS, 409)
    }
    newSlug = `${newSlug}-${slugGenerator('', true)}`
  }

  businessDTO.slug = newSlug
  delete businessDTO.password
  const business = await updateBusiness(id, businessDTO)

  return business
}
