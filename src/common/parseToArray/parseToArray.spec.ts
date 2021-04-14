import { parseToArray } from './index'

describe('parseToBool', () => {
  describe('', () => {
    test('Given an string separating by comas the function return an array of string', () => {
      // Arrange
      const strArray = 'this,is,an,array'

      // Act
      const parsedArray = parseToArray<string>(strArray, 'string')

      // Asserts
      expect(parsedArray).toEqual(strArray.split(','))
    })
    test('Given an string of numbers separating by comas the function return an array of string', () => {
      // Arrange
      const intArray = '1,2,3,4,5'

      // Act
      const parsedArray = parseToArray<number>(intArray, 'number')

      // Asserts
      expect(parsedArray).toEqual(intArray.split(',').map(Number))
    })
  })
})
