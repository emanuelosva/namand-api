import { FastifyInstance } from 'fastify'
import helmet from 'fastify-helmet'
import cors from 'fastify-cors'
import rateLimit from 'fastify-rate-limit'
import config from '@delivery/config'

export function loadMiddlewares(app: FastifyInstance) {
  app
    .register(helmet)
    .register(cors, {
      origin: config.CORS_ORIGINS,
      credentials: true,
    })
    .register(rateLimit, {
      timeWindow: '1 minute',
      max: config.MAX_REQUEST_PER_MINUTE,
    })
}
