import faker from 'faker'
import { createMock } from 'ts-auto-mock'
import { IBusiness } from '../../entities'
import {
  ILoginBusinessDeps,
  makeLoginBusiness,
} from './index'

describe('LoginBusiness', () => {
  test('Given a null email the function must be rejected', async () => {
    // Arrange
    const email = ''
    const password = faker.internet.password()
    const dependencies = createMock<ILoginBusinessDeps>()

    // Act
    const loginBusiness = makeLoginBusiness(dependencies)

    // Asserts
    await expect(loginBusiness(email, password)).rejects.toThrow()
    expect(dependencies.findBusinessByEmail).not.toHaveBeenCalled()
    expect(dependencies.hashComparator).not.toHaveBeenCalled()
  })
  test('Given a valid email but no registered the function must be rejected', async () => {
    // Arrange
    const email = faker.internet.email()
    const password = faker.internet.password()
    const dependencies = createMock<ILoginBusinessDeps>()
    dependencies.findBusinessByEmail = jest.fn(() => Promise.resolve(null))

    // Act
    const loginBusiness = makeLoginBusiness(dependencies)

    // Asserts
    await expect(loginBusiness(email, password)).rejects.toThrow()
    expect(dependencies.findBusinessByEmail).toHaveBeenCalledWith(email)
    expect(dependencies.hashComparator).not.toHaveBeenCalled()
  })
  test('Given a valid email but no password the function must be rejected', async () => {
    // Arrange
    const email = faker.internet.email()
    const password = ''
    const business = createMock<IBusiness>()

    const dependencies = createMock<ILoginBusinessDeps>()
    dependencies.findBusinessByEmail = jest.fn(() => Promise.resolve(business))

    // Act
    const loginBusiness = makeLoginBusiness(dependencies)

    // Asserts
    await expect(loginBusiness(email, password)).rejects.toThrow()
    expect(dependencies.findBusinessByEmail).toHaveBeenCalledWith(email)
    expect(dependencies.hashComparator).not.toHaveBeenCalled()
  })
  test('Given a valid email but invalid password the function must be rejected', async () => {
    // Arrange
    const email = faker.internet.email()
    const password = faker.internet.password()
    const business = createMock<IBusiness>()
    business.password = 'hash'

    const dependencies = createMock<ILoginBusinessDeps>()
    dependencies.findBusinessByEmail = jest.fn(() => Promise.resolve(business))
    dependencies.hashComparator = jest.fn(() => Promise.resolve(false))

    // Act
    const loginBusiness = makeLoginBusiness(dependencies)

    // Asserts
    await expect(loginBusiness(email, password)).rejects.toThrow()
    expect(dependencies.findBusinessByEmail).toHaveBeenCalledWith(email)
    expect(dependencies.hashComparator).toHaveBeenCalledWith(password, business.password)
  })
  test('Given a valid email and correct password the function must return the business', async () => {
    // Arrange
    const email = faker.internet.email()
    const password = faker.internet.password()
    const business = createMock<IBusiness>()
    business.password = 'hash'

    const dependencies = createMock<ILoginBusinessDeps>()
    dependencies.findBusinessByEmail = jest.fn(() => Promise.resolve(business))
    dependencies.hashComparator = jest.fn(() => Promise.resolve(true))

    // Act
    const loginBusiness = makeLoginBusiness(dependencies)
    const loggedBusiness = await loginBusiness(email, password)
    // Asserts
    expect(loggedBusiness).toEqual(business)
    expect(dependencies.findBusinessByEmail).toHaveBeenCalledWith(email)
    expect(dependencies.hashComparator).toHaveBeenCalledWith(password, business.password)
  })
})
