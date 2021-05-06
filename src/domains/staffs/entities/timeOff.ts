export interface ITimeOff {
  id: string
  staffId: string
  startTime: Date
  endTime: Date
  createdAt: Date
  updatedAt: Date
}

export interface IInputTimeOff {
  id?: string
  staffId: string
  startTime: Date
  endTime: Date
}

export interface IUpdateTimeOff {
  startTime?: Date
  endTime?: Date
}

export const makeTimeOff = (timeOff: IInputTimeOff): ITimeOff => ({
  ...timeOff,
  id: timeOff.id || '',
  createdAt: new Date(),
  updatedAt: new Date(),
})

export interface IFindTimeOffQueryOpts {
  fields?: string
  sortField?: string
  sortDirection?: string
  skip?: string,
  limit?: string,
}

export interface ITimeOffRepository {
  findMany: (businessId: string, opts?: IFindTimeOffQueryOpts) => Promise<ITimeOff[]>
  findById: (id: string, opts?: IFindTimeOffQueryOpts) => Promise<ITimeOff|null|undefined>
  createOne: (staff: IInputTimeOff) => Promise<ITimeOff>
  updateOne: (id: string, staff: IUpdateTimeOff) => Promise<ITimeOff>
  removeOne: (id: string) => Promise<void>
}
