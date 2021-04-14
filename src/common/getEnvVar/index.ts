import { parseToBool } from '../parseToBool'
import { parseToArray } from '../parseToArray'

export const getEnv = {
  number: getNumber,
  string: getString,
  boolean: getBoolean,
  array: {
    ofString: (varName: string, defaultValue?: string[]) => getArray<string>(varName, 'string', defaultValue),
    ofNumber: (varName: string, defaultValue?: number[]) => getArray<number>(varName, 'number', defaultValue),
  },
}

export function getEnvVarDefault<T>(varName: string, defaultValue?: T) {
  const envValue = process.env[varName] ?? defaultValue

  if (envValue === undefined) {
    throw new Error(`Env var: ${varName} not found in process.env`)
  }

  return envValue
}

export function getArray<T extends string|number>(varName: string, type: 'string'|'number', defaultValue?: T[]): Array<T> {
  return parseToArray<T>(getEnvVarDefault<any>(varName, defaultValue), type)
}

export function getNumber(varName: string, defaultValue?: number) {
  return +getEnvVarDefault<number>(varName, defaultValue)
}

export function getString(varName: string, defaultValue?: string) {
  return String(getEnvVarDefault<string>(varName, defaultValue))
}

export function getBoolean(varName: string, defaultValue?: boolean) {
  return parseToBool(getEnvVarDefault<boolean>(varName, defaultValue))
}
