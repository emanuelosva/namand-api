import faker from 'faker'
import { hashGenerator } from './index'

describe('hashGenerator', () => {
  test('Given a string the method must return a hash', async () => {
    // Arrange
    const password = faker.internet.password()

    // Act
    const hash = await hashGenerator(password)

    // Asserts
    expect(hash).toBeDefined()
    expect(typeof hash).toEqual('string')
    expect(hash).not.toEqual(password)
    expect(hash).toMatch(/[a-zA-Z0-9]/)
    expect(hash).toContain('$')
  })
})
