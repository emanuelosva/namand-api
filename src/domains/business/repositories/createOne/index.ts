import { PrismaClient } from '@prisma/client'
import { nanoid } from 'nanoid'
import { IInputBusiness, IBusiness, makeBusiness } from '@business/entities'
import { BusinessError } from '@business/businessError'
import { errorTypes } from '@business/constants'
import logger from '@business/logger'

export const makeCreateOne = (
  db: PrismaClient,
) => async (businessDTO: IInputBusiness): Promise<IBusiness> => {
  try {
    const cleanBusiness = {
      ...makeBusiness(businessDTO),
      id: nanoid(),
    } as any

    const business = await db.business.create({
      data: cleanBusiness,
    })

    return business
  } catch (error) {
    logger.error(`Error on repository createOne: ${businessDTO.email}  -${error.message}`)
    throw new BusinessError(errorTypes.DATABASE_WRITE_ERROR)
  }
}
