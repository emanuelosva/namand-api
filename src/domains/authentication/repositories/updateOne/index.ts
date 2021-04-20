import { PrismaClient } from '@prisma/client'
import { errorTypes } from '@authentication/constants'
import { AuthError } from '@authentication/authError'
import { IAuth } from '@authentication/entities'
import logger from '@authentication/logger'

export const makeRepoUpdateOne = (
  db: PrismaClient,
) => async (key: string, newKey: string) => {
  try {
    const apiKey = await db.authentication.update({
      where: { key },
      data: { key: newKey },
    })

    return apiKey as IAuth
  } catch (error) {
    logger.error(`Error on repoUpdateOne: ${error.message}`)
    throw new AuthError(errorTypes.DATABASE_WRITE_ERROR)
  }
}
