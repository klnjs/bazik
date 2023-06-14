import type { CSSProperties } from '@vanilla-extract/css'

export const mapArray = <T extends string>(
	values: readonly T[],
	mapper: (value: T) => CSSProperties
) =>
	Object.fromEntries(values.map((value) => [value, mapper(value)])) as {
		[K in T]: CSSProperties
	}

export const mapObject = <T extends object>(
	values: T,
	mapper: (value: T[keyof T]) => CSSProperties
) =>
	Object.fromEntries(
		Object.entries(values).map(([key, value]) => [
			key,
			mapper(value as T[keyof T])
		])
	) as { [P in keyof T]: CSSProperties }

export const addGlobalsToObject = <T extends object>(values: T) => {
	const globals = {
		inherit: 'inherit'
	} as const

	return { ...values, ...globals }
}
