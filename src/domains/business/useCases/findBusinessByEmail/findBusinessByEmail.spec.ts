import { createMock } from 'ts-auto-mock'
import { makeFindBusinessByEmail } from './index'
import { IBusiness } from '../../entities'

describe('findbusinessByEmail', () => {
  describe('', () => {
    test('Given a valid id, the function must return the business', async () => {
      // Arrange
      const email = 'email'
      const business = createMock<IBusiness>()
      const dependencies = jest.fn(() => Promise.resolve(business))

      // Act
      const findbusinessByEmail = makeFindBusinessByEmail(dependencies)
      const foundBusiness = await findbusinessByEmail(email)

      // Asserts
      expect(foundBusiness).toEqual(business)
    })
    test('Given an invalid id, the function must be rejected', async () => {
      // Arrange
      const email = 'notRegistered@mail.com'
      const dependencies = jest.fn(() => Promise.resolve(null))

      // Act
      const findbusinessByEmail = makeFindBusinessByEmail(dependencies)

      // Asserts
      await expect(findbusinessByEmail(email)).rejects.toThrow()
    })
  })
})
