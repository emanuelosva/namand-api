import { FastifyInstance } from 'fastify'
import {
  notFoundHandler,
  centralErrorHandler,
} from '@httpDelivery/middleware'

export function loadHandlers(app: FastifyInstance) {
  app
    .setNotFoundHandler(notFoundHandler)
    .setErrorHandler(centralErrorHandler)
}
