import faker from 'faker'
import { hashComparator } from './index'
import { hashGenerator } from '../hashGenerator'

describe('hashComparator', () => {
  test('Given a correct password of hash the mthod must return true', async () => {
    // Arrenage
    const password = faker.internet.password()
    const hash = await hashGenerator(password)

    // Act
    const isCorrect = await hashComparator(password, hash)

    // Asserts
    expect(isCorrect).toBeTruthy()
    expect(isCorrect).toEqual(true)
  })
  test('Given a correct password of hash the mthod must return true', async () => {
    // Arrenage
    const password = faker.internet.password()
    const hash = await hashGenerator(password)
    const badPassword = faker.internet.password().repeat(2)

    // Act
    const isCorrect = await hashComparator(badPassword, hash)

    // Asserts
    expect(isCorrect).toBeFalsy()
    expect(isCorrect).toEqual(false)
  })
})
