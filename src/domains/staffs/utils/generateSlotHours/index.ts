import { setHours, setMinutes, differenceInMinutes, addMinutes, format } from 'date-fns'
import { IAgenda, IBreak, IDayPlan } from '@staffs/entities'
import { inBlockedTime } from '../inBlockedTime'
import { getHourMinFromString } from '../getHourMinutesFromString'

export type slotStringTimes = { startTime: String, endTime: String }

export interface IGenerateDaySlotHoursParams {
  dayPlan: IDayPlan,
  slotSize: IAgenda['slotSize'],
  serviceDuration: number
}

export const generateDaySlotHours = ({
  dayPlan,
  slotSize,
  serviceDuration,
}: IGenerateDaySlotHoursParams) => {
  if (!dayPlan.active) return []

  const baseDate = new Date()

  const [initHour, initMin] = getHourMinFromString(dayPlan.startTime)
  const [endHour, endMin] = getHourMinFromString(dayPlan.endTime)

  const startTime = setHours(setMinutes(baseDate, initMin), initHour)
  const endTime = setHours(setMinutes(baseDate, endMin), endHour)

  const numberOfSlots = Math.ceil(differenceInMinutes(endTime, startTime) / slotSize)
  const breaks = generateBreakSlotsForDay(dayPlan.breaks, baseDate)

  const availableSlots = generateAvailableSlots({ startTime, endTime, numberOfSlots, breaks, slotSize, serviceDuration }) as slotStringTimes[]
  return availableSlots
}

export type breakTimes = { breakStart: Date, breakEnd: Date }

const generateBreakSlotsForDay = (breaks: IBreak[], baseDate: Date): breakTimes[] => breaks.map(bk => {
  const [initHour, initMin] = getHourMinFromString(bk.startTime)
  const [endHour, endMin] = getHourMinFromString(bk.endTime)

  return {
    breakStart: setHours(setMinutes(baseDate, initMin), initHour),
    breakEnd: setHours(setMinutes(baseDate, endMin), endHour),
  }
})

export interface IGenerateAvailableSlots {
  startTime: Date
  endTime: Date
  numberOfSlots: number
  breaks: breakTimes[]
  slotSize: number
  serviceDuration: number
}

const generateAvailableSlots = ({
  startTime,
  endTime,
  numberOfSlots,
  breaks,
  slotSize,
  serviceDuration,
}:IGenerateAvailableSlots) => {
  const dayHours = Array.from({ length: numberOfSlots }).map((_, index) => {
    const startSlot = addMinutes(startTime, index * slotSize)
    const endSlot = addMinutes(startSlot, serviceDuration)

    if (endSlot.getTime() > endTime.getTime()) return null

    const inBreakTime = breaks.find(({ breakStart, breakEnd }) =>
      inBlockedTime({ startTime: startSlot, endTime: endSlot, startRef: breakStart, endRef: breakEnd }),
    )
    if (inBreakTime) return null

    return { startTime: format(startSlot, 'HH:mm'), endTime: format(endSlot, 'HH:mm') }
  })

  return dayHours.filter(Boolean)
}
