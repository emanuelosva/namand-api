import { FastifyInstance } from 'fastify'

export function loadHttpRoutes(app: FastifyInstance) {
  app
    .register(require('@httpDelivery/routes').businessRoutes, { prefix: '/api/v1/business' })
    .register(require('@httpDelivery/routes').healthyRoutes, { prefix: '/api/v1/health' })
}
