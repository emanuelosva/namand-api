import faker from 'faker'
import { getEnv } from './index'

describe('getEnv', () => {
  describe('number vars', () => {
    test('Given a non defined env var and not default valu the function must throw', () => {
      // Arrange
      const envNotDefined = 'some-value-no-defined'

      // Asserts
      expect(() => getEnv.number(envNotDefined)).toThrow()
    })
    test('Given a non defined env var but default number value the function must return number default', () => {
      // Arrange
      const envNotDefined = 'some-value-no-defined'
      const defaultVal = Math.random() * 1000

      // Act
      const value = getEnv.number(envNotDefined, defaultVal)

      // Asserts
      expect(value).toEqual(defaultVal)
    })
    test('Given a non defined env var but default number 0 the function must return 0', () => {
      // Arrange
      const envNotDefined = 'some-value-no-defined'
      const defaultVal = 0

      // Act
      const value = getEnv.number(envNotDefined, defaultVal)

      // Asserts
      expect(value).toEqual(defaultVal)
    })
    test('Given a defined env var, the function must return the env value', () => {
      // Arrange
      const definedEnvVar = 'some-value-defined'
      const envValue = Math.random() * 1000
      process.env[definedEnvVar] = String(envValue)

      // Act
      const value = getEnv.number(definedEnvVar)

      // Asserts
      expect(value).toEqual(envValue)
    })
  })
  describe('string vars', () => {
    test('Given a non defined env var and not default valu the function must throw', () => {
      // Arrange
      const envNotDefined = 'some-value-no-defined'

      // Asserts
      expect(() => getEnv.string(envNotDefined)).toThrow()
    })
    test('Given a non defined env var but default string value the function must return string default', () => {
      // Arrange
      const envNotDefined = 'some-value-no-defined'
      const defaultVal = faker.random.word()

      // Act
      const value = getEnv.string(envNotDefined, defaultVal)

      // Asserts
      expect(value).toEqual(defaultVal)
    })
    test('Given a non defined env var but default  "" the function must return ""', () => {
      // Arrange
      const envNotDefined = 'some-value-no-defined'
      const defaultVal = ''

      // Act
      const value = getEnv.string(envNotDefined, defaultVal)

      // Asserts
      expect(value).toEqual(defaultVal)
    })
    test('Given a defined env var, the function must return the env value', () => {
      // Arrange
      const definedEnvVar = 'some-value-defined-string'
      const envValue = faker.random.word()
      process.env[definedEnvVar] = envValue

      // Act
      const value = getEnv.string(definedEnvVar)

      // Asserts
      expect(value).toEqual(envValue)
    })
  })
  describe('boolean vars', () => {
    test('Given a non defined env var but default value the function must return default', () => {
      // Arrange
      const envNotDefined = 'some-value-no-defined'
      const defaultVal = true

      // Act
      const value = getEnv.boolean(envNotDefined, defaultVal)

      // Asserts
      expect(value).toEqual(defaultVal)
    })
    test('Given a non defined env var but default false the function must return false', () => {
      // Arrange
      const envNotDefined = 'some-value-no-defined'
      const defaultVal = false

      // Act
      const value = getEnv.boolean(envNotDefined, defaultVal)

      // Asserts
      expect(value).toEqual(defaultVal)
    })
    test('Given a defined env var, the function must return the env value', () => {
      // Arrange
      const definedEnvVar = 'some-value-defined-boolean'
      const envValue = true
      process.env[definedEnvVar] = String(envValue)

      // Act
      const value = getEnv.boolean(definedEnvVar)

      // Asserts
      expect(value).toEqual(envValue)
    })
  })
  describe('array vars', () => {
    test('Given a non defined env var but default array value the function must return array default', () => {
      // Arrange
      const envNotDefined = 'some-value-no-defined'
      const defaultValStr = ['a', 'b', 'c']
      const defaultValNumber = [1, 2, 3, 2.5]

      // Act
      const arrayStr = getEnv.array.ofString(envNotDefined, defaultValStr)
      const arrayNumber = getEnv.array.ofNumber(envNotDefined, defaultValNumber)

      // Asserts
      expect(arrayStr).toEqual(defaultValStr)
      expect(arrayNumber).toEqual(defaultValNumber)
    })
    test('Given a defined env var, the function must return the env value', () => {
      // Arrange
      const definedEnvVar = 'some-value-defined-boolean'
      const envValue = '1,2,3,4,5'
      process.env[definedEnvVar] = envValue

      // Act
      const valueStr = getEnv.array.ofString(definedEnvVar)
      const valueNumb = getEnv.array.ofNumber(definedEnvVar)

      // Asserts
      expect(valueStr).toEqual(envValue.split(','))
      expect(valueNumb).toEqual(envValue.split(',').map(Number))
    })
  })
})
