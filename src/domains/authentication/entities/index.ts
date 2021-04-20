export interface IAuth {
  id: string
  key: string
  businessId: string
  createdAt: Date|number
  updatedAt: Date|number
}

export interface IAuthInput {
  id: string
  key: string
  businessId: string
}

export const makeAuth = ({ id, key, businessId } : IAuthInput): IAuth => ({
  id,
  key,
  businessId,
  createdAt: new Date(),
  updatedAt: new Date(),
})

export interface IAuthRepository {
  findByApiKey: (key: string) => Promise<IAuth|null|undefined>
  findByBusinessId: (businessId: string) => Promise<IAuth|null|undefined>
  createOne: (businessId: string, key: string) => Promise<IAuth>
  updateOne: (key: string, newKey: string) => Promise<IAuth>
}
