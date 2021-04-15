import slugify from 'slugify'

export const slugGenerator = (value: string) => {
  if (typeof value !== 'string') {
    throw new Error(`Only astring can be converted to a slug. Passed: ${value} `)
  }
  return slugify(value, {
    replacement: '-',
    remove: /[*+~.()'"!:@;,{}]/g,
    lower: true,
  })
}
