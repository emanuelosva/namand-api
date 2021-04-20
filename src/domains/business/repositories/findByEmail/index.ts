import { PrismaClient } from '@prisma/client'
import { IBusiness } from '@business/entities'
import { BusinessError } from '@business/businessError'
import { errorTypes } from '@business/constants'
import logger from '@business/logger'

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
