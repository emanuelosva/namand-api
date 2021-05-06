import logger from '@delivery/logger'
import businessRoutes from './endpoints'

export default async function(fastify) {
  logger.info('Registering business routes')
  businessRoutes.forEach(function(route) {
    fastify.route(route)
  })
}
