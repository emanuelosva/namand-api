import faker from 'faker'
import { createMock } from 'ts-auto-mock'
import { IAuth } from '../../entities'
import { makeAuthByAPIKey } from './index'

describe('AuthByAPIKey', () => {
  test('Given an invalid key the function must be rejected', async () => {
    // Arrange
    const key = faker.random.alphaNumeric()
    const dependencies = jest.fn(() => Promise.resolve(null))

    // Act
    const authByAPIKey = makeAuthByAPIKey(dependencies)

    // Asserts
    await expect(authByAPIKey(key)).rejects.toThrow()
  })
  test('Given a valid key the function must return the correspondent apiKey instance', async () => {
    // Arrange
    const key = faker.random.alphaNumeric()
    const apiKey = createMock<IAuth>()
    const dependencies = jest.fn(() => Promise.resolve(apiKey))

    // Act
    const authByAPIKey = makeAuthByAPIKey(dependencies)
    const foundApiKey = await authByAPIKey(key)

    // Asserts
    expect(foundApiKey).toEqual(foundApiKey)
  })
})
