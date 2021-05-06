import { FastifyInstance } from 'fastify'
import { Schema } from 'joi'

export function loadRequestValidators(app: FastifyInstance) {
  app.setValidatorCompiler(({ schema }: { schema: Schema}) => {
    return (data) => schema.validate(data)
  })
}
