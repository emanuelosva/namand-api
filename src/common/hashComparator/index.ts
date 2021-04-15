import bcrypt from 'bcrypt'

export const hashComparator = async (truePassword: string, password: string): Promise<boolean> => {
  try {
    const isCorrect = bcrypt.compare(truePassword, password)
    return isCorrect
  } catch (error) {
    return false
  }
}
