import { FastifyRequest, FastifyReply } from 'fastify'
import { httpStatus } from '@delivery/utils'

export function notFoundHandler(request: FastifyRequest, reply: FastifyReply) {
  reply.code(httpStatus.notFound).send({
    error: true,
    message: 'Endpoint not found',
    meta: {
      status: httpStatus.notFound,
      errorContex: {},
    },
  })
}
