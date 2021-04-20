import { PrismaClient } from '@prisma/client'
import { IUpdateBusiness, IBusiness } from '@business/entities'
import { BusinessError } from '@business/businessError'
import { errorTypes } from '@business/constants'
import logger from '@business/logger'

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
