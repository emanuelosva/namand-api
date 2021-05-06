import { FastifyRequest, FastifyReply } from 'fastify'
import { httpStatus } from '@delivery/utils'
import { ApiError } from '@delivery/deliveryError'
import logger from '@delivery/logger'

export function centralErrorHandler(
  error: ApiError|Error|any,
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const defaultStatusCode = error.validationContext ? httpStatus.badRequest : httpStatus.serverError

  error.status = error.status ? error.status : defaultStatusCode || 500

  logger.error(`[http] -> Error - path: ${request.method} ${request.url} - ${error.message} - Status: ${error.status} | Context: `, { error })

  replay.code(error.status).send({
    error: true,
    message: error.message,
    meta: {
      status: error.status,
      errorContex: {
        ...error.metadata,
        ...(error.validationContext && { path: error.validationContext }),
      },
    },
  })
}
