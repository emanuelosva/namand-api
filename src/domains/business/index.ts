import { db } from '@infraestructure/index'
import {
  slugGenerator,
  hashComparator,
  hashGenerator,
} from '@common/index'
import {
  makeFindById,
  makeFindBySlug,
  makeFindByEmail,
  makeCreateOne,
  makeUpdateOne,
} from '@business/repositories'
import {
  makeFindBusinessById,
  makeFindBusinessByEmail,
  makeFindBusinessBySlug,
  makeCreateNewBusiness,
  makeUpdateBusiness,
  makeUpdateBusinessPassword,
} from '@business/useCases'
import { createApiKey } from '@authentication/index'

export { IBusiness } from '@business/entities'

const businessRepoFindById = makeFindById(db)
const businessRepoFindBySlug = makeFindBySlug(db)
const businessRepoFindByEmail = makeFindByEmail(db)
const businessRepoCreateOne = makeCreateOne(db)
const businessRepoUpdateOne = makeUpdateOne(db)

export const businessService = {
  findById: makeFindBusinessById(businessRepoFindById),
  findByEmail: makeFindBusinessByEmail(businessRepoFindByEmail),
  findBySlug: makeFindBusinessBySlug(businessRepoFindBySlug),
  createOne: makeCreateNewBusiness({
    findBusinessByEmail: businessRepoFindByEmail,
    findBusinessBySlug: businessRepoFindBySlug,
    createNewBusiness: businessRepoCreateOne,
    hashGenerator,
    slugGenerator,
    createApiKey,
  }),
  updateOne: makeUpdateBusiness({
    findBusinessByEmail: businessRepoFindByEmail,
    findBusinessBySlug: businessRepoFindBySlug,
    updateBusiness: businessRepoUpdateOne,
    slugGenerator,
  }),
  updatePassword: makeUpdateBusinessPassword({
    findBusinessById: businessRepoFindById,
    hashComparator,
    hashGenerator,
    updateBusiness: businessRepoUpdateOne,
  }),
}

export default businessService
