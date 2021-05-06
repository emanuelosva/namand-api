import { businessHandlers as handlers } from '@httpDelivery/adapters'
import { apiKeyAuthentication } from '@httpDelivery/middleware'
import * as validators from './validators'

export default [
  {
    method: 'POST',
    url: '/',
    schema: validators.createOne,
    handler: handlers.createBusiness,
  },
  {
    method: 'GET',
    url: '/:id',
    schema: validators.findById,
    preValidation: [apiKeyAuthentication],
    handler: handlers.findBusinessById,
  },
  {
    method: 'PUT',
    url: '/:id',
    schema: validators.updateOne,
    handler: handlers.updateBusiness,
  },
  {
    method: 'GET',
    url: '/get-by-slug/:slug',
    schema: validators.createOne,
    handler: handlers.findBusinessBySlug,
  },
  {
    method: 'PUT',
    url: '/:id/change-password',
    schema: validators.updatePassword,
    handler: handlers.updateBusinessPassword,
  },
]
