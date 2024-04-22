/* eslint-disable @typescript-eslint/no-explicit-any */

export const isProperty = (
	record: Record<PropertyKey, any>,
	property: PropertyKey
): property is keyof typeof record => property in record
