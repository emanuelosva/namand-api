import { createMock } from 'ts-auto-mock'
import {
  IBusiness,
  IInputBusiness,
} from '../../entities'
import {
  ICreateNewBusinessDeps,
  makeCreateNewBusiness,
} from './index'

describe('CreateNewBusiness', () => {
  describe('', () => {
    test('Given a valid business input with no existent slug the function must return the created business', async () => {
      // Arrange
      const businessDTO = createMock<IInputBusiness>()
      const business = createMock<IBusiness>()

      const dependencies = createMock<ICreateNewBusinessDeps>()
      dependencies.findBusinessByEmail = jest.fn(() => Promise.resolve(null))
      dependencies.findBusinessBySlug = jest.fn(() => Promise.resolve(null))
      dependencies.createNewBusiness = jest.fn(() => Promise.resolve(business))

      // Act
      const createNewBusiness = makeCreateNewBusiness(dependencies)
      const createdBusiness = await createNewBusiness(businessDTO)

      // Asserts
      expect(createdBusiness).toEqual(business)
      expect(dependencies.findBusinessBySlug).toHaveBeenCalled()
      expect(dependencies.findBusinessByEmail).toHaveBeenCalled()
      expect(dependencies.slugGenerator).toHaveBeenCalled()
      expect(dependencies.hashGenerator).toHaveBeenCalledWith(businessDTO.password)
      expect(dependencies.createNewBusiness).toHaveBeenCalledWith(businessDTO)
    })
    test('Given a valid business input withouth slug but existent name-slug the function must return the created business with extra slug', async () => {
      // Arrange
      const businessDTO = createMock<IInputBusiness>()
      const business = createMock<IBusiness>()

      const dependencies = createMock<ICreateNewBusinessDeps>()
      dependencies.slugGenerator = jest.fn(() => 'slug')
      dependencies.findBusinessByEmail = jest.fn(() => Promise.resolve(null))
      dependencies.findBusinessBySlug = jest.fn(() => Promise.resolve(business))
      dependencies.createNewBusiness = jest.fn(() => Promise.resolve(business))

      // Act
      const createNewBusiness = makeCreateNewBusiness(dependencies)
      const createdBusiness = await createNewBusiness(businessDTO)

      // Asserts
      expect(createdBusiness).toEqual(business)
      expect(dependencies.findBusinessBySlug).toHaveBeenCalled()
      expect(dependencies.findBusinessByEmail).toHaveBeenCalled()
      expect(dependencies.slugGenerator).toHaveBeenCalledTimes(2)
      expect(dependencies.slugGenerator).lastCalledWith('', true)
      expect(dependencies.hashGenerator).toHaveBeenCalledWith(businessDTO.password)
      expect(dependencies.createNewBusiness).toHaveBeenCalledWith({ ...businessDTO, slug: 'slug-slug' })
    })
    test('Given a valid business input with an existent slug the function must be rejected', async () => {
      // Arrange
      const businessDTO = createMock<IInputBusiness>()
      businessDTO.slug = 'defined'
      const business = createMock<IBusiness>()

      const dependencies = createMock<ICreateNewBusinessDeps>()
      dependencies.slugGenerator = jest.fn(() => 'slug')
      dependencies.findBusinessByEmail = jest.fn(() => Promise.resolve(null))
      dependencies.findBusinessBySlug = jest.fn(() => Promise.resolve(business))
      dependencies.createNewBusiness = jest.fn(() => Promise.resolve(business))

      // Act
      const createNewBusiness = makeCreateNewBusiness(dependencies)

      // Asserts
      await expect(createNewBusiness(businessDTO)).rejects.toThrow()
      expect(dependencies.findBusinessByEmail).toHaveBeenCalled()
      expect(dependencies.findBusinessBySlug).toHaveBeenCalled()
      expect(dependencies.slugGenerator).not.toHaveBeenCalled()
      expect(dependencies.hashGenerator).not.toHaveBeenCalled()
      expect(dependencies.createNewBusiness).not.toHaveBeenCalled()
    })
    test('Given a valid business input with an existent email the function must be rejected', async () => {
      // Arrange
      const businessDTO = createMock<IInputBusiness>()
      const business = createMock<IBusiness>()

      const dependencies = createMock<ICreateNewBusinessDeps>()
      dependencies.slugGenerator = jest.fn(() => 'slug')
      dependencies.findBusinessByEmail = jest.fn(() => Promise.resolve(business))
      dependencies.findBusinessBySlug = jest.fn(() => Promise.resolve(null))
      dependencies.createNewBusiness = jest.fn(() => Promise.resolve(business))

      // Act
      const createNewBusiness = makeCreateNewBusiness(dependencies)

      // Asserts
      await expect(createNewBusiness(businessDTO)).rejects.toThrow()
      expect(dependencies.slugGenerator).toHaveBeenCalled()
      expect(dependencies.findBusinessByEmail).toHaveBeenCalled()
      expect(dependencies.findBusinessBySlug).not.toHaveBeenCalled()
      expect(dependencies.hashGenerator).not.toHaveBeenCalled()
      expect(dependencies.createNewBusiness).not.toHaveBeenCalled()
    })
  })
})
