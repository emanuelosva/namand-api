import { createMock } from 'ts-auto-mock'
import { generateDaySlotHours } from './index'
import { IBreak, IDayPlan } from '../../entities'

describe('generateDaySlotHours', () => {
  describe('Given a valid dayPlan and service duration the method must return all available hours', () => {
    test('day inactive', () => {
      // Arrange
      const dayPlan = createMock<IDayPlan>()
      const serviceDuration = 50
      const slotSize = 60

      // Act
      const slots = generateDaySlotHours({ dayPlan, slotSize, serviceDuration })

      // Asserts
      expect(slots).toEqual([])
    })
    test('day without breaks, init at hh:00 minutes, serviceDuration=50 min', () => {
      // Arrange
      const serviceDuration = 50
      const slotSize = 60
      const dayPlan = createMock<IDayPlan>()
      dayPlan.active = true
      dayPlan.breaks = []
      dayPlan.startTime = '09:00'
      dayPlan.endTime = '16:00'

      // Act
      const dayWithHours = generateDaySlotHours({ dayPlan, slotSize, serviceDuration })

      // Asserts
      expect(dayWithHours).toEqual([
        { startTime: '09:00', endTime: '09:50' },
        { startTime: '10:00', endTime: '10:50' },
        { startTime: '11:00', endTime: '11:50' },
        { startTime: '12:00', endTime: '12:50' },
        { startTime: '13:00', endTime: '13:50' },
        { startTime: '14:00', endTime: '14:50' },
        { startTime: '15:00', endTime: '15:50' },
      ])
    })
    test('day defined with breaks, init at hh:00 minutes, serviceDuration=50 min', () => {
      // Arrange
      const serviceDuration = 50
      const slotSize = 60
      const dayPlan = createMock<IDayPlan>()
      dayPlan.active = true
      dayPlan.startTime = '07:00'
      dayPlan.endTime = '23:00'
      dayPlan.breaks = [
        { startTime: '10:00', endTime: '11:30', reason: '' },
        { startTime: '16:00', endTime: '17:00', reason: '' },
        { startTime: '21:00', endTime: '22:00', reason: '' },
      ].map(({ startTime, endTime }) => {
        const bk = createMock<IBreak>()
        return { ...bk, startTime, endTime }
      })

      // Act
      const dayWithHours = generateDaySlotHours({ dayPlan, slotSize, serviceDuration })

      // Asserts
      expect(dayWithHours).toEqual([
        { startTime: '07:00', endTime: '07:50' },
        { startTime: '08:00', endTime: '08:50' },
        { startTime: '09:00', endTime: '09:50' },
        { startTime: '12:00', endTime: '12:50' },
        { startTime: '13:00', endTime: '13:50' },
        { startTime: '14:00', endTime: '14:50' },
        { startTime: '15:00', endTime: '15:50' },
        { startTime: '17:00', endTime: '17:50' },
        { startTime: '18:00', endTime: '18:50' },
        { startTime: '19:00', endTime: '19:50' },
        { startTime: '20:00', endTime: '20:50' },
        { startTime: '22:00', endTime: '22:50' },
      ])
    })
    test('day defined without breaks, init at hh:00 minutes, serviceDuration=100 min', () => {
      // Arrange
      const serviceDuration = 100
      const slotSize = 60
      const dayPlan = createMock<IDayPlan>()
      dayPlan.active = true
      dayPlan.startTime = '09:00'
      dayPlan.endTime = '16:00'
      dayPlan.breaks = []

      // Act
      const dayWithHours = generateDaySlotHours({ dayPlan, slotSize, serviceDuration })

      // Asserts
      expect(dayWithHours).toEqual([
        { startTime: '09:00', endTime: '10:40' },
        { startTime: '10:00', endTime: '11:40' },
        { startTime: '11:00', endTime: '12:40' },
        { startTime: '12:00', endTime: '13:40' },
        { startTime: '13:00', endTime: '14:40' },
        { startTime: '14:00', endTime: '15:40' },
      ])
    })
    test('day defined with breaks, init at hh:00 minutes, serviceDuration=100 min', () => {
      // Arrange
      const serviceDuration = 100
      const slotSize = 60
      const dayPlan = createMock<IDayPlan>()
      dayPlan.active = true
      dayPlan.startTime = '09:00'
      dayPlan.endTime = '17:00'
      dayPlan.breaks = [
        { startTime: '10:00', endTime: '11:30' },
        { startTime: '14:00', endTime: '14:30' },
      ].map(({ startTime, endTime }) => {
        const bk = createMock<IBreak>()
        return { ...bk, startTime, endTime }
      })

      // Act
      const dayWithHours = generateDaySlotHours({ dayPlan, slotSize, serviceDuration })

      // Asserts
      expect(dayWithHours).toEqual([
        { startTime: '12:00', endTime: '13:40' },
        { startTime: '15:00', endTime: '16:40' },
      ])
    })
    test('days defined without breaks, init at 30 minutes, serviceDuration=50 min', () => {
      // Arrange
      const serviceDuration = 50
      const slotSize = 60
      const dayPlan = createMock<IDayPlan>()
      dayPlan.active = true
      dayPlan.startTime = '08:30'
      dayPlan.endTime = '16:00'
      dayPlan.breaks = []

      // Act
      const dayWithHours = generateDaySlotHours({ dayPlan, slotSize, serviceDuration })

      // Asserts
      expect(dayWithHours).toEqual([
        { startTime: '08:30', endTime: '09:20' },
        { startTime: '09:30', endTime: '10:20' },
        { startTime: '10:30', endTime: '11:20' },
        { startTime: '11:30', endTime: '12:20' },
        { startTime: '12:30', endTime: '13:20' },
        { startTime: '13:30', endTime: '14:20' },
        { startTime: '14:30', endTime: '15:20' },
      ])
    })
    test('day defined without breaks, init at 30 minutes, serviceDuration=100 min', () => {
      // Arrange
      const serviceDuration = 100
      const slotSize = 60
      const dayPlan = createMock<IDayPlan>()
      dayPlan.active = true
      dayPlan.startTime = '08:30'
      dayPlan.endTime = '16:10'
      dayPlan.breaks = []

      // Act
      const dayWithHours = generateDaySlotHours({ dayPlan, slotSize, serviceDuration })

      // Asserts
      expect(dayWithHours).toEqual([
        { startTime: '08:30', endTime: '10:10' },
        { startTime: '09:30', endTime: '11:10' },
        { startTime: '10:30', endTime: '12:10' },
        { startTime: '11:30', endTime: '13:10' },
        { startTime: '12:30', endTime: '14:10' },
        { startTime: '13:30', endTime: '15:10' },
        { startTime: '14:30', endTime: '16:10' },
      ])
    })
    test('day defined without breaks, init at 00 minutes, serviceDuration=60 min, slotSize=30', () => {
      // Arrange
      const serviceDuration = 60
      const slotSize = 30
      const dayPlan = createMock<IDayPlan>()
      dayPlan.active = true
      dayPlan.startTime = '11:00'
      dayPlan.endTime = '16:00'
      dayPlan.breaks = []

      // Act
      const dayWithHours = generateDaySlotHours({ dayPlan, slotSize, serviceDuration })

      // Asserts
      expect(dayWithHours).toEqual([
        { startTime: '11:00', endTime: '12:00' },
        { startTime: '11:30', endTime: '12:30' },
        { startTime: '12:00', endTime: '13:00' },
        { startTime: '12:30', endTime: '13:30' },
        { startTime: '13:00', endTime: '14:00' },
        { startTime: '13:30', endTime: '14:30' },
        { startTime: '14:00', endTime: '15:00' },
        { startTime: '14:30', endTime: '15:30' },
        { startTime: '15:00', endTime: '16:00' },
      ])
    })
  })
})
