import { keyGenerator } from './index'

describe('keyGenerator', () => {
  test('Given a call to function must return a unique key string', () => {
    // Act
    const key1 = keyGenerator()
    const key2 = keyGenerator()

    // Expect
    expect(key1).toBeDefined()
    expect(key2).toBeDefined()
    expect(typeof key1).toEqual('string')
    expect(typeof key2).toEqual('string')
    expect(key1).not.toEqual(key2)
  })
})
