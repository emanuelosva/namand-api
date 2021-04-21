import { nanoid } from 'nanoid'
import { PrismaClient } from '@prisma/client'
import { errorTypes } from '@authentication/constants'
import { AuthError } from '@authentication/authError'
import { makeAuth } from '@authentication/entities'
import logger from '@authentication/logger'

export const makeRepoCreateOne = (
  db: PrismaClient,
) => async (businessId: string, key: string) => {
  try {
    const apiKeyData = makeAuth({ id: nanoid(), businessId, key }) as any
    delete apiKeyData.businessId

    const apiKey = await db.authentication.create({
      data: {
        ...apiKeyData,
        business: { connect: { id: businessId } },
      },
    })

    return apiKey
  } catch (error) {
    logger.error(`Error on repoCreateOne: ${error.message}`)
    throw new AuthError(errorTypes.DATABASE_WRITE_ERROR)
  }
}
