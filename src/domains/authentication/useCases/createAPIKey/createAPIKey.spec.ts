import faker from 'faker'
import { createMock } from 'ts-auto-mock'
import { IAuth } from '../../entities'
import {
  ICreateAPIKeyDeps,
  makeCreateAPIKey,
} from './index'

describe('createAPIKey', () => {
  test('Given a falsy busiessId the function must be rejected', async () => {
    // Act
    const busiessId = ''
    const dependencies = createMock<ICreateAPIKeyDeps>()

    // Act
    const createAPIKey = makeCreateAPIKey(dependencies)

    // Asserts
    await expect(createAPIKey(busiessId)).rejects.toThrow()
    expect(dependencies.findByBusinessId).not.toHaveBeenCalled()
    expect(dependencies.keyGenerator).not.toHaveBeenCalled()
    expect(dependencies.createAuth).not.toHaveBeenCalled()
  })
  test('Given a busiessId that exist in Auth the the function must return the apiKey', async () => {
    // Act
    const busiessId = faker.datatype.uuid()
    const apiKey = createMock<IAuth>()
    const dependencies = createMock<ICreateAPIKeyDeps>()

    dependencies.findByBusinessId = jest.fn(() => Promise.resolve(apiKey))

    // Act
    const createAPIKey = makeCreateAPIKey(dependencies)
    const gotKey = await createAPIKey(busiessId)

    // Asserts
    expect(gotKey).toEqual(apiKey)
    expect(dependencies.findByBusinessId).toHaveBeenCalledWith(busiessId)
    expect(dependencies.keyGenerator).not.toHaveBeenCalled()
    expect(dependencies.createAuth).not.toHaveBeenCalled()
  })
  test('Given a busiessId that no exist in Auth the the function must return the created apiKey', async () => {
    // Act
    const busiessId = faker.datatype.uuid()
    const key = faker.datatype.uuid()
    const apiKey = createMock<IAuth>()
    const dependencies = createMock<ICreateAPIKeyDeps>()

    dependencies.findByBusinessId = jest.fn(() => Promise.resolve(null))
    dependencies.keyGenerator = jest.fn(() => key)

    // Act
    const createAPIKey = makeCreateAPIKey(dependencies)
    const gotKey = await createAPIKey(busiessId)

    // Asserts
    expect(gotKey).toEqual(apiKey)
    expect(dependencies.findByBusinessId).toHaveBeenCalledWith(busiessId)
    expect(dependencies.keyGenerator).toHaveBeenCalled()
    expect(dependencies.createAuth).toHaveBeenCalledWith(busiessId, key)
  })
})
