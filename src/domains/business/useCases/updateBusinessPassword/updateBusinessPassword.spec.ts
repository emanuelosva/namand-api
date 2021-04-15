import faker from 'faker'
import { createMock } from 'ts-auto-mock'
import { IBusiness } from '../../entities'
import {
  IUpdateBusinessPasswordDeps,
  makeUpdateBusinessPassword,
} from './index'

describe('UpdateBusinessPassword', () => {
  describe('', () => {
    test('Given an invalid id the function must be rejected', async () => {
      // Arrange
      const id = faker.datatype.uuid()
      const oldPassword = faker.internet.password()
      const newPassword = faker.internet.password()

      const dependencies = createMock<IUpdateBusinessPasswordDeps>()
      dependencies.findBusinessById = jest.fn(() => Promise.resolve(null))

      // Act
      const updateBusinessPassword = makeUpdateBusinessPassword(dependencies)

      // Asserts
      await expect(updateBusinessPassword(id, oldPassword, newPassword)).rejects.toThrow()
      expect(dependencies.findBusinessById).toHaveBeenCalledWith(id)
      expect(dependencies.hashComparator).not.toHaveBeenCalled()
      expect(dependencies.hashGenerator).not.toHaveBeenCalled()
      expect(dependencies.updateBusiness).not.toHaveBeenCalled()
    })
    test('Given a valid id with a bad oldPassword the function must be rejected', async () => {
      // Arrange
      const id = faker.datatype.uuid()
      const oldPassword = faker.internet.password()
      const newPassword = faker.internet.password()
      const business = createMock<IBusiness>()
      business.password = faker.internet.password()

      const dependencies = createMock<IUpdateBusinessPasswordDeps>()
      dependencies.findBusinessById = jest.fn(() => Promise.resolve(business))
      dependencies.hashComparator = jest.fn(() => Promise.resolve(false))

      // Act
      const updateBusinessPassword = makeUpdateBusinessPassword(dependencies)

      // Asserts
      await expect(updateBusinessPassword(id, oldPassword, newPassword)).rejects.toThrow()
      expect(dependencies.findBusinessById).toHaveBeenCalledWith(id)
      expect(dependencies.hashComparator).toHaveBeenCalledWith(oldPassword, business.password)
      expect(dependencies.hashGenerator).not.toHaveBeenCalled()
      expect(dependencies.updateBusiness).not.toHaveBeenCalled()
    })
    test('Given a valid id with a valid oldPassword the function must return the updated business', async () => {
      // Arrange
      const id = faker.datatype.uuid()
      const oldPassword = faker.internet.password()
      const newPassword = faker.internet.password()
      const business = createMock<IBusiness>()
      business.password = faker.internet.password()

      const dependencies = createMock<IUpdateBusinessPasswordDeps>()
      dependencies.findBusinessById = jest.fn(() => Promise.resolve(business))
      dependencies.hashComparator = jest.fn(() => Promise.resolve(true))
      dependencies.hashGenerator = jest.fn(() => Promise.resolve('hash'))

      // Act
      const updateBusinessPassword = makeUpdateBusinessPassword(dependencies)
      await updateBusinessPassword(id, oldPassword, newPassword)

      // Asserts
      expect(dependencies.findBusinessById).toHaveBeenCalledWith(id)
      expect(dependencies.hashComparator).toHaveBeenCalledWith(oldPassword, business.password)
      expect(dependencies.hashGenerator).toHaveBeenCalledWith(newPassword)
      expect(dependencies.updateBusiness).toHaveBeenCalledWith(id, { password: 'hash' })
    })
  })
})
