import faker from 'faker'
import { parseToBool } from './index'

describe('parseToBool', () => {
  describe('', () => {
    test('Given a falsy value, function must return false', () => {
      // Arrange
      const falsyValues = [0, undefined, null, NaN, '']

      // Act
      falsyValues.forEach((falsy) => {
        const parsedBool = parseToBool(falsy)

        // Asserts
        expect(parsedBool).toEqual(false)
      })
    })
    test('Given a truth value, function must return true', () => {
      const thruthValues = [true, 'true', 'yes', '1', 1]

      // Act
      thruthValues.forEach((truth) => {
        const parsedBool = parseToBool(truth)

        // Asserts
        expect(parsedBool).toEqual(true)
      })
    })
    test('Given a random value not truthy, function must return false', () => {
      const value = faker.random.alpha()

      // Act
      const parsedBool = parseToBool(value)

      // Asserts
      expect(parsedBool).toEqual(false)
    })
  })
})
