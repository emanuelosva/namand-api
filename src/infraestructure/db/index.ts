import { PrismaClient } from '@prisma/client'
import { getEnv } from '../../common'

const env = getEnv.string('NODE_ENV', 'development')

const prismaConfig = {
  ...(env === 'production' && {
    datasources: {
      db: {
        url: getEnv.string('DB_URL'),
        provider: 'postgress',
      },
    },
  }),
}

export const db = new PrismaClient(prismaConfig)
