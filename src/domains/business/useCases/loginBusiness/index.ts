import { IBusinessRepository } from '../../entities'
import { errorTypes } from '../../constants'
import { BusinessError } from '../../businessError'
import logger from '../../logger'

export interface ILoginBusinessDeps {
  findBusinessByEmail: IBusinessRepository['findByEmail'],
  hashComparator: (password: string, hash: string) => Promise<boolean>
}

export const makeLoginBusiness = ({
  findBusinessByEmail,
  hashComparator,
}: ILoginBusinessDeps,
) => async (email: string, password: string) => {
  logger.info(`Loging a business with email: ${email}`)

  const business = email && await findBusinessByEmail(email)
  if (!business) {
    logger.error(`Error on loggin with email ${email} - business not found`)
    throw new BusinessError(errorTypes.INVALID_CREDENTIALS, 401)
  }

  const correctPassword = password && await hashComparator(password, business.password)
  if (!correctPassword) {
    logger.error(`Error on loggin with email ${email} - invalid passwors`)
    throw new BusinessError(errorTypes.INVALID_CREDENTIALS, 401)
  }

  return business
}
