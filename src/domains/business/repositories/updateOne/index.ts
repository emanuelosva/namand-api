import { PrismaClient } from '@prisma/client'
import { IUpdateBusiness, IBusiness } from '../../entities'
import { BusinessError } from '../../businessError'
import { errorTypes } from '../../constants'
import logger from 'domains/business/logger'

export const makeUpdateOne = (
  db: PrismaClient,
) => async (id: string, businessDTO: IUpdateBusiness): Promise<IBusiness> => {
  try {
    const business = await db.business.update({
      where: { id },
      data: businessDTO,
    })

    return business
  } catch (error) {
    logger.error(`Error on repository updateOne: ${id} -${error.message}`)
    if (error.messahe === 'RecordNotFound') throw new BusinessError(errorTypes.BUSINESS_NOT_FOUND)
    throw new BusinessError(errorTypes.DATABASE_WRITE_ERROR)
  }
}
