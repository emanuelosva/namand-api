import logger from '@staffs/logger'

export const getHourMinFromString = (stringTime: string) => {
  if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(stringTime)) {
    logger.error('Error on getHourMinFromString - BadStringTime')
    throw new Error(`Error on getHourMinFromString - BadStringTime: ${stringTime}`)
  }
  return stringTime.split(':').map(Number)
}
