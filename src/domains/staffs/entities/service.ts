export interface IService {
  id: string
  name: string
  duration: number
  priceLocal: number
  proceUSD: number
  staffId: string
  staff?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

export interface IInputService {
  id?: string
  name: string
  duration: number
  priceLocal: number
  proceUSD?: number
  staffId: string
}

export interface IUpdateService {
  name?: string
  duration?: number
  priceLocal?: number
  proceUSD?: number
}

export const makeService = (service: IInputService): IService => ({
  ...service,
  id: service.id || '',
  proceUSD: service.proceUSD || -1,
  createdAt: new Date(),
  updatedAt: new Date(),
})

export interface IFindServiceQueryOpts {
  includeStaff?: boolean
  fields?: string
  sortField?: string
  sortDirection?: string
  skip?: string,
  limit?: string,
}

export interface IServiceRepository {
  findMany: (businessId: string, opts?: IFindServiceQueryOpts) => Promise<IService[]>
  findById: (id: string, opts?: IFindServiceQueryOpts) => Promise<IService|null|undefined>
  createOne: (staff: IInputService) => Promise<IService>
  updateOne: (id: string, staff: IUpdateService) => Promise<IService>
  removeOne: (id: string) => Promise<void>
}
