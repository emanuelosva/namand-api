import { PrismaClient } from '@prisma/client'
import { IBusiness } from '../../entities'
import { BusinessError } from '../../businessError'
import { errorTypes } from '../../constants'
import logger from 'domains/business/logger'

export const makeFindById = (
  db: PrismaClient,
) => async (id: string): Promise<IBusiness|null|undefined> => {
  try {
    const business = await db.business.findUnique({
      where: { id },
    })
    return business
  } catch (error) {
    logger.error(`Error on repository findById: ${id}  -${error.message}`)
    throw new BusinessError(errorTypes.DATABASE_READ_ERROR)
  }
}
