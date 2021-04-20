import { PrismaClient } from '@prisma/client'
import { errorTypes } from '@authentication/constants'
import { AuthError } from '@authentication/authError'
import logger from '@authentication/logger'

export const makeRepoFindByApiKey = (
  db: PrismaClient,
) => async (key: string) => {
  try {
    const apiKey = await db.authentication.findUnique({
      where: { key },
      include: { business: true },
    })

    return apiKey
  } catch (error) {
    logger.error(`Error on repoFindByApiKey: ${error.message}`)
    throw new AuthError(errorTypes.DATABASE_READ_ERROR)
  }
}
