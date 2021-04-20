import faker from 'faker'
import { createMock } from 'ts-auto-mock'
import { IAuth } from '../../entities'
import {
  IUpdateAPIKeyDeps,
  makeUpdateAPIKey,
} from './index'

describe('UpdateAPIKey', () => {
  test('Given a null key the function must be rejected', async () => {
    // Arrange
    const key = ''
    const businessId = faker.datatype.uuid()
    const dependencies = createMock<IUpdateAPIKeyDeps>()

    // Act
    const updateAPIKey = makeUpdateAPIKey(dependencies)

    // Asserts
    await expect(updateAPIKey(key, businessId)).rejects.toThrow()
    expect(dependencies.findByAPIKey).not.toHaveBeenCalledWith(key)
    expect(dependencies.keyGenerator).not.toHaveBeenCalled()
    expect(dependencies.updateAPIKey).not.toHaveBeenCalled()
  })
  test('Given a key but no registered the function must be rejected', async () => {
    // Arrange
    const key = faker.datatype.uuid()
    const businessId = faker.datatype.uuid()
    const dependencies = createMock<IUpdateAPIKeyDeps>()
    dependencies.findByAPIKey = jest.fn(() => Promise.resolve(null))

    // Act
    const updateAPIKey = makeUpdateAPIKey(dependencies)

    // Asserts
    await expect(updateAPIKey(key, businessId)).rejects.toThrow()
    expect(dependencies.findByAPIKey).toHaveBeenCalledWith(key)
    expect(dependencies.keyGenerator).not.toHaveBeenCalled()
    expect(dependencies.updateAPIKey).not.toHaveBeenCalled()
  })
  test('Given a key but businessId diferent of apiKey instance the function must be rejected', async () => {
    // Arrange
    const key = faker.datatype.uuid()
    const businessId = faker.datatype.uuid()
    const apiKey = createMock<IAuth>()

    const dependencies = createMock<IUpdateAPIKeyDeps>()
    dependencies.findByAPIKey = jest.fn(() => Promise.resolve(apiKey))

    // Act
    const updateAPIKey = makeUpdateAPIKey(dependencies)

    // Asserts
    await expect(updateAPIKey(key, businessId)).rejects.toThrow()
    expect(dependencies.findByAPIKey).toHaveBeenCalledWith(key)
    expect(dependencies.keyGenerator).not.toHaveBeenCalled()
    expect(dependencies.updateAPIKey).not.toHaveBeenCalled()
  })
  test('Given a key with businessId associated with the apiKey instance the function return the updated apiKey', async () => {
    // Arrange
    const key = faker.datatype.uuid()
    const newKey = faker.random.alphaNumeric()
    const businessId = faker.datatype.uuid()
    const apiKey = createMock<IAuth>()
    apiKey.businessId = businessId

    const dependencies = createMock<IUpdateAPIKeyDeps>()
    dependencies.findByAPIKey = jest.fn(() => Promise.resolve(apiKey))
    dependencies.keyGenerator = jest.fn(() => newKey)
    dependencies.updateAPIKey = jest.fn(() => Promise.resolve(apiKey))

    // Act
    const updateAPIKey = makeUpdateAPIKey(dependencies)
    const updatedApiKey = await updateAPIKey(key, businessId)

    // Asserts
    expect(updatedApiKey).toEqual(apiKey)
    expect(dependencies.findByAPIKey).toHaveBeenCalledWith(key)
    expect(dependencies.keyGenerator).toHaveBeenCalled()
    expect(dependencies.updateAPIKey).toHaveBeenCalledWith(apiKey.key, newKey)
  })
})
