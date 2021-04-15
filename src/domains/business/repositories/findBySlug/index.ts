import { PrismaClient } from '@prisma/client'
import { IBusiness } from '../../entities'
import { BusinessError } from '../../businessError'
import { errorTypes } from '../../constants'
import logger from 'domains/business/logger'

export const makeFindBySlug = (
  db: PrismaClient,
) => async (slug: string): Promise<IBusiness|null|undefined> => {
  try {
    const business = await db.business.findUnique({
      where: { slug },
    })
    return business
  } catch (error) {
    logger.error(`Error on repository findByslug: ${slug} -${error.message}`)
    throw new BusinessError(errorTypes.DATABASE_READ_ERROR)
  }
}
