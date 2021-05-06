import { IBusiness } from '../domains/business'

declare module 'fastify' {
  // eslint-disable-next-line no-unused-vars
  interface FastifyRequest {
    business?: IBusiness
  }
}
