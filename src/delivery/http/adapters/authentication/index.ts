import authServices from '@authentication/index'
import { httpStatus } from '@delivery/utils'

export async function updateApiKey(request, reply) {
  const { key } = request.body
  const apiKey = await authServices.updateOne(key, request.business.id)
  reply.code(httpStatus.ok).send(apiKey.key)
}
