export type weekDay = 'monday'
  | 'tuesday'
  | 'wensday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export interface IBreak {
  id: string
  dayName: weekDay
  startTime: string
  endTime: string
  dayPlanId: string
  createdAt: Date
  updatedAt: Date
}

export interface IInputBreak {
  id?: string
  dayName: weekDay
  startTime: string
  endTime: string
  dayPlanId: string
}

export interface IUpdateBreak {
  startTime?: string
  endTime?: string
}

export const makeBreak = (breakD: IInputBreak): IBreak => ({
  ...breakD,
  id: breakD.id || '',
  createdAt: new Date(),
  updatedAt: new Date(),
})

export interface IDayPlan {
  id: string
  dayName: weekDay
  dayNumber: number
  active: boolean
  startTime: string
  endTime: string
  agendaId: string
  breaks: IBreak[]
  createdAt: Date
  updatedAt: Date
}

export interface IInputDayPlan {
  id?: string
  dayName: weekDay
  dayNumber: number
  active: boolean
  startTime: string
  endTime: string
  agendaId: string
  breaks?: IBreak[]
}

export interface IUpdateDayPlan {
  active?: boolean
  startTime?: string
  endTime?: string
}

export const makeDayPlan = (dayPlan: IInputDayPlan): IDayPlan => ({
  ...dayPlan,
  id: dayPlan.id || '',
  breaks: dayPlan.breaks || [],
  createdAt: new Date(),
  updatedAt: new Date(),
})

export interface IAgenda {
  id: string
  staffId: string
  timezone: string
  slotSize: number
  advanceBookingMinutes: number
  workingPlan: IDayPlan[]
  createdAt: Date
  updatedAt: Date
}

export interface IInputAgenda {
  id?: string
  staffId: string
  timezone: string
  slotSize?: number
  advanceBookingMinutes?: number
  workingPlan: IDayPlan[]
}

export interface IUpdateAgenda {
  timezone?: string
  slotSize?: number
  advanceBookingMinutes?: number
}

export const makeAgenda = (agenda: IInputAgenda): IAgenda => ({
  ...agenda,
  id: agenda.id || '',
  slotSize: agenda.slotSize || 60,
  advanceBookingMinutes: agenda.advanceBookingMinutes || 180,
  workingPlan: agenda.workingPlan || [],
  createdAt: new Date(),
  updatedAt: new Date(),
})

export interface IFindAgendaQueryOpts {
  includeWorkingPlan: boolean
  fields: string
}

export interface IAgendaRepository {
  findById: (id: string, opts?: IFindAgendaQueryOpts) => Promise<IAgenda|null|undefined>
  findByStaffId: (staffId: string, opts: IFindAgendaQueryOpts) => Promise<IAgenda|null|undefined>
  createOne: (agenda: IInputAgenda) => Promise<IAgenda>
  updateSettings: (id: string, agenda: IUpdateAgenda) => Promise<IAgenda>
  updateDayPlan: (id: string, dayName: string, dayPlan: IInputDayPlan) => Promise<IAgenda>
  updateDayBreaks: (id: string, dayName: string, breaks: IInputBreak[]) => Promise<IAgenda>
}
