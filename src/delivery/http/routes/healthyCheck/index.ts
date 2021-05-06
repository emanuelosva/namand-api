import logger from '@delivery/logger'
import healthyRoutes from './endpoints'

export default async function(fastify) {
  logger.info('Registering healthy routes')
  healthyRoutes.forEach(function(route) {
    fastify.route(route)
  })
}
