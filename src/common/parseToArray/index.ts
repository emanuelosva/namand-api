export function parseToArray<T extends string|number>(value: string|string[], type: 'string'|'number'): T[] {
  return Array.isArray(value)
    ? value.map(v => parseType(v, type))
    : value.split(',').map(v => parseType(v, type))
}

const parseType = (value: string, type: 'string'|'number'): any => {
  return type === 'number' ? +value : String(value)
}
