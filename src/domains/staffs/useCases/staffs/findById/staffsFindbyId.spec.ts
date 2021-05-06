import { createMock } from 'ts-auto-mock'
import faker from 'faker'
import { makeFindStaffById } from './index'
import {
  IStaff,
} from '../../../entities'

describe('FindStaffById', () => {
  test('Given a valid id the function must return the found staff', async () => {
    // Arrange
    const id = faker.datatype.uuid()
    const staff = createMock<IStaff>()
    const dependencies = jest.fn(() => Promise.resolve(staff))

    // Act
    const findStaffById = makeFindStaffById(dependencies)
    const foundStaff = await findStaffById(id)

    // Asserts
    expect(foundStaff).toEqual(staff)
    expect(dependencies).toHaveBeenCalledWith(id, undefined)
  })
  test('Given a valid id the function must return the found staff filter by options', async () => {
    // Arrange
    const id = faker.datatype.uuid()
    const staff = createMock<IStaff>()
    const dependencies = jest.fn(() => Promise.resolve(staff))

    // Act
    const findStaffById = makeFindStaffById(dependencies)
    const foundStaff = await findStaffById(id, { fields: 'id name' })

    // Asserts
    expect(foundStaff).toEqual(staff)
    expect(dependencies).toHaveBeenCalledWith(id, { fields: 'id name' })
  })
  test('Given a valid no existing id the function must be rejected', async () => {
    // Arrange
    const id = faker.datatype.uuid()
    const dependencies = jest.fn(() => Promise.resolve(null))

    // Act
    const findStaffById = makeFindStaffById(dependencies)

    // Asserts
    await expect(findStaffById(id)).rejects.toThrow()
    expect(dependencies).toHaveBeenCalledWith(id, undefined)
  })
})
