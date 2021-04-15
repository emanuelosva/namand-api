import { PrismaClient } from '@prisma/client'
import { IInputBusiness, IBusiness, makeBusiness } from '../../entities'
import { BusinessError } from '../../businessError'
import { errorTypes } from '../../constants'
import logger from 'domains/business/logger'

export const makeCreateOne = (
  db: PrismaClient,
) => async (businessDTO: IInputBusiness): Promise<IBusiness> => {
  try {
    const cleanBusiness = makeBusiness(businessDTO) as any

    const business = await db.business.create({
      data: cleanBusiness,
    })

    return business
  } catch (error) {
    logger.error(`Error on repository createOne: ${businessDTO.email}  -${error.message}`)
    throw new BusinessError(errorTypes.DATABASE_WRITE_ERROR)
  }
}
