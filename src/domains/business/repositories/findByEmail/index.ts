import { PrismaClient } from '@prisma/client'
import { IBusiness } from '../../entities'
import { BusinessError } from '../../businessError'
import { errorTypes } from '../../constants'
import logger from 'domains/business/logger'

export const makeFindByEmail = (
  db: PrismaClient,
) => async (email: string): Promise<IBusiness|null|undefined> => {
  try {
    const business = await db.business.findUnique({
      where: { email },
    })
    return business
  } catch (error) {
    logger.error(`Error on repository findByEmail: ${email}  -${error.message}`)
    throw new BusinessError(errorTypes.DATABASE_READ_ERROR)
  }
}
