import { getHourMinFromString } from './index'

describe('getHourMinFromString', () => {
  test('Given a valid string HH:mm the function must return an array with [hour, min] numbers', () => {
    // Arrange
    const dateStrins = [
      '10:00',
      '23:00',
      '12:32',
      '09:29',
    ]

    // Act
    dateStrins.forEach((date) => {
      // Asserts
      expect(getHourMinFromString(date)).toEqual(
        date.split(':').map(Number),
      )
    })
  })
  test('Given a invalid string in format HH:mm the function must be rejected', () => {
    // Arrange
    const dateStrins = [
      'anyWord',
      '24:01',
      '08:98',
      'ad:_E',
    ]

    // Act
    dateStrins.forEach((date) => {
      // Asserts
      expect(() => getHourMinFromString(date)).toThrow()
    })
  })
})
