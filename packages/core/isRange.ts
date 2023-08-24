export type Range<T> = [start: T, end: T]

export type RangeOptional<T> = [start: T | null, end: T | null]

export const isRange = <T>(value: T | T[]): value is Range<T> =>
	Array.isArray(value) && value.length === 2 && value.every((v) => Boolean(v))
