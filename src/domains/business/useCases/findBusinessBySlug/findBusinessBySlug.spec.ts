import { createMock } from 'ts-auto-mock'
import { IBusiness } from '../../entities'
import { makeFindBusinessBySlug } from './index'

describe('FindBusinessBySlug', () => {
  describe('', () => {
    test('Given a valid slug, the function must return the business', async () => {
      // Arrange
      const slug = 'slug'
      const business = createMock<IBusiness>()
      const dependencies = jest.fn(() => Promise.resolve(business))

      // Act
      const findBusinessBySlug = makeFindBusinessBySlug(dependencies)
      const foundBusiness = await findBusinessBySlug(slug)

      // Asserts
      expect(foundBusiness).toEqual(business)
    })
    test('Given an invalid slug, the function must be rejected', async () => {
      // Arrange
      const slug = 'invalid-slug'
      const dependencies = jest.fn(() => Promise.resolve(null))

      // Act
      const findBusinessBySlug = makeFindBusinessBySlug(dependencies)

      // Asserts
      await expect(findBusinessBySlug(slug)).rejects.toThrow()
    })
  })
})
