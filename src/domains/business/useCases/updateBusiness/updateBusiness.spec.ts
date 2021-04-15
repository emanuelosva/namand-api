import { createMock } from 'ts-auto-mock'
import {
  IBusiness,
  IUpdateBusiness,
} from '../../entities'
import {
  IUpdateNewBusinessDeps,
  makeUpdateBusiness,
} from './index'

describe('updateBusiness', () => {
  describe('', () => {
    test('Given a new email input with and an existent email the function must be rejected', async () => {
      // Arrange
      const id = 'id'
      const businessDTO = createMock<IUpdateBusiness>()
      businessDTO.email = 'new@email.com'

      const business = createMock<IBusiness>()

      const dependencies = createMock<IUpdateNewBusinessDeps>()
      dependencies.findBusinessByEmail = jest.fn(() => Promise.resolve(business))

      // Act
      const updateBusiness = makeUpdateBusiness(dependencies)

      // Asserts
      await expect(updateBusiness(id, businessDTO)).rejects.toThrow()
      expect(dependencies.findBusinessByEmail).toHaveBeenCalled()
      expect(dependencies.slugGenerator).not.toHaveBeenCalled()
      expect(dependencies.findBusinessBySlug).not.toHaveBeenCalled()
      expect(dependencies.updateBusiness).not.toHaveBeenCalled()
    })
    test('Given a new nlug input with and an existent slug the function must be rejected', async () => {
      // Arrange
      const id = 'id'
      const businessDTO = createMock<IUpdateBusiness>()
      businessDTO.slug = 'new-slug'

      const business = createMock<IBusiness>()

      const dependencies = createMock<IUpdateNewBusinessDeps>()
      dependencies.findBusinessBySlug = jest.fn(() => Promise.resolve(business))

      // Act
      const updateBusiness = makeUpdateBusiness(dependencies)

      // Asserts
      await expect(updateBusiness(id, businessDTO)).rejects.toThrow()
      expect(dependencies.findBusinessBySlug).toHaveBeenCalledWith(businessDTO.slug)
      expect(dependencies.findBusinessByEmail).not.toHaveBeenCalled()
      expect(dependencies.slugGenerator).not.toHaveBeenCalled()
      expect(dependencies.updateBusiness).not.toHaveBeenCalled()
    })
    test('Given a new name input with and an existent slug the function must return the updated business with extra slug', async () => {
      // Arrange
      const id = 'id'
      const businessDTO = createMock<IUpdateBusiness>()
      businessDTO.name = 'new-name'

      const business = createMock<IBusiness>()

      const dependencies = createMock<IUpdateNewBusinessDeps>()
      dependencies.findBusinessBySlug = jest.fn(() => Promise.resolve(business))
      dependencies.slugGenerator = jest.fn(() => 'slug')
      dependencies.updateBusiness = jest.fn(() => Promise.resolve(business))

      // Act
      const updateBusiness = makeUpdateBusiness(dependencies)
      const updatedBusines = await updateBusiness(id, businessDTO)

      // Asserts
      expect(updatedBusines).toEqual(business)
      expect(dependencies.findBusinessByEmail).not.toHaveBeenCalled()
      expect(dependencies.findBusinessBySlug).toHaveBeenCalledWith('slug')
      expect(dependencies.slugGenerator).toHaveBeenCalledTimes(2)
      expect(dependencies.slugGenerator).toHaveBeenLastCalledWith('', true)
      expect(dependencies.updateBusiness).toHaveBeenCalledWith(id, { ...businessDTO, slug: 'slug-slug' })
    })
    test('Given a valid business input with no existent slug or email the function must return the updated business', async () => {
      // Arrange
      const id = 'id'
      const businessDTO = createMock<IUpdateBusiness>()
      businessDTO.email = 'example@email.com'
      businessDTO.slug = 'some-cool-slug'
      delete businessDTO.password

      const business = createMock<IBusiness>()

      const dependencies = createMock<IUpdateNewBusinessDeps>()
      dependencies.findBusinessByEmail = jest.fn(() => Promise.resolve(null))
      dependencies.findBusinessBySlug = jest.fn(() => Promise.resolve(null))
      dependencies.updateBusiness = jest.fn(() => Promise.resolve(business))

      // Act
      const updateBusiness = makeUpdateBusiness(dependencies)
      const updatedBusiness = await updateBusiness(id, businessDTO)

      // Asserts
      expect(updatedBusiness).toEqual(business)
      expect(dependencies.findBusinessBySlug).toHaveBeenCalled()
      expect(dependencies.findBusinessByEmail).toHaveBeenCalled()
      expect(dependencies.slugGenerator).not.toHaveBeenCalled()
      expect(dependencies.updateBusiness).toHaveBeenCalledWith(id, businessDTO)
    })
    test('Given a valid business input differetn from email or slug with no existent slug or email the function must return the updated business', async () => {
      // Arrange
      const id = 'id'
      const businessDTO = createMock<IUpdateBusiness>()

      const business = createMock<IBusiness>()

      const dependencies = createMock<IUpdateNewBusinessDeps>()
      dependencies.updateBusiness = jest.fn(() => Promise.resolve(business))

      // Act
      const updateBusiness = makeUpdateBusiness(dependencies)
      const updatedBusiness = await updateBusiness(id, businessDTO)

      // Asserts
      expect(updatedBusiness).toEqual(business)
      expect(dependencies.findBusinessBySlug).not.toHaveBeenCalled()
      expect(dependencies.findBusinessByEmail).not.toHaveBeenCalled()
      expect(dependencies.slugGenerator).not.toHaveBeenCalled()
      expect(dependencies.updateBusiness).toHaveBeenCalledWith(id, businessDTO)
    })
  })
})
