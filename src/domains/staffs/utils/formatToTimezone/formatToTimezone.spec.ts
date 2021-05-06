import { formatToTimezone } from './index'

describe('formatToTimezone', () => {
  test('Given a valid Date, timezone and locale the function must return the formated date', () => {
    // Arrange
    const date = new Date('2021-04-01T05:00-00:00')
    const timeZone = 'Europe/Madrid'

    // Act
    const formatted = formatToTimezone(date, { timeZone })

    // Asserts
    expect(formatted).toEqual('2021-04-01T07:00:00+02:00')
  })
  test('Given a valid Date, timezone and locale the function must return the formated date', () => {
    // Arrange
    const date = new Date('2021-04-01T05:00-05:00')
    const timeZone = 'America/New_York'

    // Act
    const formatted = formatToTimezone(date, { timeZone })

    // Asserts
    expect(formatted).toEqual('2021-04-01T06:00:00-04:00')
  })
  test('Given a valid Date, timezone and locale the function must return the formated date', () => {
    // Arrange
    const date = new Date('2021-04-01T05:00-05:00')
    const timeZone = 'America/New_York'

    // Act
    const formatted = formatToTimezone(date, { timeZone, format: 'HH:mm' })

    // Asserts
    expect(formatted).toEqual('06:00')
  })
})
