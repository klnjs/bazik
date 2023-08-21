import type { Range } from './types'

export const isRange = <T>(value: T | T[]): value is Range<T> =>
	Array.isArray(value) && value.length === 2 && value.every((v) => Boolean(v))
