export interface IBusinessNew {
  name: string
  email: string
  slug: string
  currency: string
  password: string
  createdAt: Date | number
  updatedAt: Date | number
}

export interface IBusiness extends IBusinessNew {
  id: string
}

export interface IUpdateBusiness {
  name?: string
  email?: string
  slug?: string
  currency?: string
  password?: string
}

export interface IInputBusiness {
  id?: string
  name: string
  email: string
  slug: string
  currency: string
  password: string
  createdAt?: Date | number
  updatedAt?: Date | number
}

export const makeBusiness = (businessDTO: IInputBusiness): IBusiness => {
  const business: IBusiness = {
    id: businessDTO.id || '',
    name: businessDTO.name,
    email: businessDTO.email,
    slug: businessDTO.slug,
    currency: businessDTO.currency,
    password: businessDTO.password,
    createdAt: businessDTO.createdAt || new Date(),
    updatedAt: businessDTO.createdAt || new Date(),
  }

  return business
}

export interface IBusinessRepository {
  findById: (id: string) => Promise<IBusiness|null|undefined>
  findByEmail: (email: string) => Promise<IBusiness|null|undefined>
  findBySlug: (slug: string) => Promise<IBusiness|null|undefined>
  createOne: (businessDTO: IInputBusiness) => Promise<IBusiness>
  updateOne: (id: string, businessDTO: IUpdateBusiness) => Promise<IBusiness>
}
