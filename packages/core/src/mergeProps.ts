/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { clsx } from './clsx'
import { chain } from './chain'

type Props = Record<string, any>

type TupleTypes<T> =
	{ [P in keyof T]: T[P] } extends Record<number, infer V>
		? NullToObject<V>
		: never

type NullToObject<T> = T extends null | undefined ? NonNullable<unknown> : T

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
	k: infer I
) => void
	? I
	: never

export function mergeProps<T extends Props[]>(
	...args: T
): UnionToIntersection<TupleTypes<T>> {
	const merged: Props = { ...args[0] }

	for (let i = 1; i < args.length; i++) {
		const props = args[i]

		for (const key in props) {
			const a = merged[key]
			const b = props[key]

			if (
				key === 'style' &&
				typeof a === 'object' &&
				typeof b === 'object'
			) {
				merged[key] = { ...a, ...b }
			} else if (
				key === 'className' &&
				typeof a === 'string' &&
				typeof b === 'string'
			) {
				merged[key] = clsx(a, b)
			} else if (
				/^on[A-Z]/.test(key) &&
				typeof a === 'function' &&
				typeof b === 'function'
			) {
				merged[key] = chain(a, b)
			} else {
				merged[key] = b ?? a
			}
		}
	}

	return merged as UnionToIntersection<TupleTypes<T>>
}
