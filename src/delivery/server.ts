import fastify from 'fastify'
import {
  loadRequestValidators,
  loadMiddlewares,
  loadHttpRoutes,
  loadHandlers,
} from '@delivery/loaders'

const app = fastify({
  logger: true,
  trustProxy: true,
})

loadRequestValidators(app)
loadMiddlewares(app)
loadHttpRoutes(app)
loadHandlers(app)

export default app
