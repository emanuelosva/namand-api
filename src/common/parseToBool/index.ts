export const parseToBool = (value: any, defaultValue?: boolean) => {
  const parsedValue = value ?? 'notDefined'

  if (parsedValue === 'notDefined') {
    return defaultValue === undefined ? false : defaultValue
  }

  if (!value) return false

  const trueValues = [true, 'true', 'yes', '1', 1]
  if (trueValues.includes(value)) return true

  return false
}
