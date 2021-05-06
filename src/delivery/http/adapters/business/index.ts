import businessService from '@business/index'
import { httpStatus } from '@delivery/utils'

export async function createBusiness(request, reply) {
  const data = request.body

  const business = await businessService.createOne(data)
  reply.code(httpStatus.created).send(business)
}

export async function findBusinessById(request, reply) {
  const { id } = request.params

  const business = await businessService.findById(id)
  reply.code(httpStatus.created).send(business)
}

export async function findBusinessBySlug(request, reply) {
  const { slug } = request.params

  const business = await businessService.findBySlug(slug)
  reply.code(httpStatus.created).send(business)
}

export async function updateBusiness(request, reply) {
  const { body: data, params: { id } } = request

  const business = await businessService.updateOne(id, data)
  return business
}

export async function updateBusinessPassword(request, reply) {
  const { oldPassword, newPassword } = request.body

  const business = await businessService.updatePassword(
    request.business.id,
    oldPassword,
    newPassword,
  )
  reply.code(httpStatus.ok).send(business)
}
