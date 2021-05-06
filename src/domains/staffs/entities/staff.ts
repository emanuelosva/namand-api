export interface IStaff {
  id: string
  slug: string
  name: string
  lastName: string
  email: string
  phone: string
  countryCode?: string
  password?: string
  businessId: string
  business?: Record<string, any>
  services?: Record<string, any>[]
  createdAt: Date|number
  updatedAt: Date|number
}

export interface IInputStaff {
  id?: string
  slug: string
  name: string
  lastName: string
  email: string
  phone: string
  countryCode?: string
  password: string
  businessId: string
}

export interface IUpdateStaff {
  slug?: string
  name?: string
  lastName?: string
  email?: string
  phone?: string
  countryCode?: string
}

export const makeStaff = (staff: IInputStaff): IStaff => ({
  ...staff,
  id: staff.id || '',
  createdAt: new Date(),
  updatedAt: new Date(),
})

export interface IFindStaffQueryOpts {
  includeServices?: boolean
  fields?: string
  sortField?: string
  sortDirection?: string
  skip?: string,
  limit?: string,
}

export interface IStaffRepository {
  findMany: (businessId: string, opts?: IFindStaffQueryOpts) => Promise<IStaff[]>
  findById: (id: string, opts?: IFindStaffQueryOpts) => Promise<IStaff|null|undefined>
  findByEmail: (email: string, opts?: IFindStaffQueryOpts) => Promise<IStaff|null|undefined>
  createOne: (staff: IInputStaff) => Promise<IStaff>
  updateOne: (id: string, staff: IUpdateStaff) => Promise<IStaff>
  removeOne: (id: string) => Promise<void>
}
