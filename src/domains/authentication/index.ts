import { db } from '@infraestructure/index'
import {
  makeRepoCreateOne,
  makeRepoFindByApiKey,
  makeRepoFindByBusinessId,
  makeRepoUpdateOne,
} from '@authentication/repositories'
import {
  makeAuthByAPIKey,
  makeCreateAPIKey,
  makeUpdateAPIKey,
} from '@authentication/useCases'
import { keyGenerator } from '@authentication/utils'

export { IAuth } from '@authentication/entities'

const apiKeyRepoCreateOne = makeRepoCreateOne(db)
const apiKeyRepoFindByApiKey = makeRepoFindByApiKey(db)
const apiKeyRepoFindByBusinessId = makeRepoFindByBusinessId(db)
const apiKeyRepoUpdateOne = makeRepoUpdateOne(db)

export const authByApiKey = makeAuthByAPIKey(apiKeyRepoFindByApiKey)

export const createApiKey = makeCreateAPIKey({
  createAuth: apiKeyRepoCreateOne,
  findByBusinessId: apiKeyRepoFindByBusinessId,
  keyGenerator,
})

export const updateApiKey = makeUpdateAPIKey({
  findByAPIKey: apiKeyRepoFindByApiKey,
  updateAPIKey: apiKeyRepoUpdateOne,
  keyGenerator,
})

export default {
  createOne: createApiKey,
  updateOne: updateApiKey,
  authenticate: authByApiKey,
}
