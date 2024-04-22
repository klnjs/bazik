/* eslint-disable @typescript-eslint/no-explicit-any */

export const isRecord = (value: unknown): value is Record<PropertyKey, any> =>
	value !== null &&
	value !== undefined &&
	!Array.isArray(value) &&
	typeof value === 'object'
