import { PrismaClient } from '@prisma/client'
import { errorTypes } from '@authentication/constants'
import { AuthError } from '@authentication/authError'
import logger from '@authentication/logger'

export const makeRepoFindByBusinessId = (
  db: PrismaClient,
) => async (businessId: string) => {
  try {
    const apiKey = await db.authentication.findUnique({
      where: { businessId },
    })

    return apiKey
  } catch (error) {
    logger.error(`Error on repoFindByBusinessId: ${error.message}`)
    throw new AuthError(errorTypes.DATABASE_READ_ERROR)
  }
}
