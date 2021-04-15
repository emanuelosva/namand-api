import { slugGenerator } from './index'

describe('slugGenerator', () => {
  test('Given a string word or phrase the method must retur the slug representation', () => {
    // Arrange
    const toSlug = 'Some with title'

    // Act
    const slug = slugGenerator(toSlug)

    // Asserts
    expect(slug).toEqual(toSlug.replace(/\s/g, '-').toLowerCase())
  })
  test('Given a string word or phrase with special characters the method must retur the slug representation', () => {
    // Arrange
    const toSlug = 'This is * -- ;'

    // Act
    const slug = slugGenerator(toSlug)

    // Asserts
    expect(slug).toEqual('this-is-')
  })
})
