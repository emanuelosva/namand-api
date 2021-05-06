import { healthyHandler as handler } from '@httpDelivery/adapters'

export default [
  {
    method: 'GET',
    url: '/',
    handler: handler.healthyCheck,
  },
]
