/* eslint-disable @typescript-eslint/no-explicit-any */

export const isSet = <T>(value: T): value is NonNullable<T> =>
	value !== null && value !== undefined

export const isFunction = (value: unknown): value is (...args: any[]) => any =>
	typeof value === 'function'

export const isRecord = (value: unknown): value is Record<PropertyKey, any> =>
	isSet(value) && !isArray(value) && typeof value === 'object'

export const isRecordProperty = (
	record: Record<PropertyKey, any>,
	property: PropertyKey
): property is keyof typeof record => property in record

export const isArray = (value: unknown): value is any[] => Array.isArray(value)

export const isString = (value: unknown): value is string =>
	typeof value === 'string'

export const isNumber = (value: unknown): value is number =>
	Number.isFinite(value)

export const isRTL = (element: Element | EventTarget) =>
	getComputedStyle(element as Element).direction === 'rtl'
