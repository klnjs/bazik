import type { Range } from './types'

export const isSet = <T>(
	value: T | null | undefined
): value is NonNullable<T> => value !== null && value !== undefined

export const isRecord = (
	value: unknown
): value is Record<PropertyKey, unknown> =>
	isSet(value) && !isArray(value) && typeof value === 'object'

export const isRecordProperty = <T extends Record<PropertyKey, unknown>>(
	record: T,
	property: PropertyKey
): property is keyof T => property in record

export const isArray = (value: unknown): value is unknown[] =>
	Array.isArray(value)

export const isArrayValue = <T>(
	array: T[] | readonly T[],
	value: unknown
): boolean => array.includes(value as T)

export const isString = (value: unknown): value is string =>
	typeof value === 'string'

export const isNumber = (value: unknown): value is number =>
	Number.isFinite(value)

export const isRange = <T>(value: T | T[]): value is Range<T> =>
	isArray(value) && value.length === 2 && value.every((v) => Boolean(v))

export const isRTL = (element: Element | EventTarget) =>
	getComputedStyle(element as Element).direction === 'rtl'
