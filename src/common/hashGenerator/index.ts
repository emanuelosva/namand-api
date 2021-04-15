import bcrypt from 'bcrypt'

export const hashGenerator = async (value: string) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(value, salt)
}
