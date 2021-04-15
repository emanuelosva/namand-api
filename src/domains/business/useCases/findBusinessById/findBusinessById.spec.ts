import { createMock } from 'ts-auto-mock'
import { makeFindBusinessById } from './index'
import { IBusiness } from '../../entities'

describe('FindBusinessById', () => {
  describe('', () => {
    test('Given a valid id, the function must return the business', async () => {
      // Arrange
      const id = 'id'
      const business = createMock<IBusiness>()
      const dependencies = jest.fn(() => Promise.resolve(business))

      // Act
      const findBusinessById = makeFindBusinessById(dependencies)
      const foundBusiness = await findBusinessById(id)

      // Asserts
      expect(foundBusiness).toEqual(business)
    })
    test('Given an invalid id, the function must be rejected', async () => {
      // Arrange
      const id = 'invalid-id'
      const dependencies = jest.fn(() => Promise.resolve(null))

      // Act
      const findBusinessById = makeFindBusinessById(dependencies)

      // Asserts
      await expect(findBusinessById(id)).rejects.toThrow()
    })
  })
})
