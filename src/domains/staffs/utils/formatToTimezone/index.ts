import { utcToZonedTime, format as dateFormat } from 'date-fns-tz'

export const ISO_FORMAT = 'yyyy-MM-dd HH:mm:ssXXX'

export const formatToTimezone = (
  date: Date|number,
  { timeZone = 'UTC', format = ISO_FORMAT },
) => {
  const time = typeof date === 'number' ? date : date.getTime()
  const zonedDate = utcToZonedTime(time, timeZone)
  return format === ISO_FORMAT
    ? dateFormat(zonedDate, format, { timeZone }).replace(' ', 'T')
    : dateFormat(zonedDate, format, { timeZone })
}
