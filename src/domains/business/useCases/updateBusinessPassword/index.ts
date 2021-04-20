import { IBusinessRepository, IBusiness } from '@business/entities'
import { errorTypes } from '@business/constants'
import { BusinessError } from '@business/businessError'
import logger from '@business/logger'

export interface IUpdateBusinessPasswordDeps {
  findBusinessById: IBusinessRepository['findById']
  updateBusiness: IBusinessRepository['updateOne']
  hashComparator: (password: string, truePassword: string) => Promise<boolean>
  hashGenerator: (value: string) => Promise<string>
}

export const makeUpdateBusinessPassword = ({
  findBusinessById,
  hashComparator,
  hashGenerator,
  updateBusiness,
}: IUpdateBusinessPasswordDeps,
) => async (id: string, oldPassword: string, newPassword: string) => {
  logger.info(`Updating business password with id: ${id}`)

  const business = await findBusinessById(id)

  if (!business) {
    logger.error(`Error on findBusinessById: ${id} - not found`)
    throw new BusinessError(errorTypes.BUSINESS_NOT_FOUND, 404)
  }

  const isPasswordCorrect = await hashComparator(oldPassword, business.password)
  if (!isPasswordCorrect) {
    logger.error(`Error on compare password for business: ${id}`)
    throw new BusinessError(errorTypes.INVALID_CREDENTIALS, 401)
  }

  const password = await hashGenerator(newPassword)
  const updatedBusiness = await updateBusiness(id, { password })

  return updatedBusiness as IBusiness
}
