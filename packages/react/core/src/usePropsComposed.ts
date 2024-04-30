import { useMemo, type Ref, type DependencyList } from 'react'
import { isFunction, isRecord, isString } from '@klnjs/assertion'
import { composeRefs } from './useRefComposed'

type TupleTypes<T> =
	{ [P in keyof T]: T[P] } extends Record<number, infer V>
		? NullToObject<V>
		: never

type NullToObject<T> = T extends null | undefined ? NonNullable<unknown> : T

type UnionToIntersection<U> = (
	U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
	? I
	: never

export type Props = Record<string, unknown>

export function composeProps<T extends Props[]>(...props: T) {
	const merged: Props = { ...props[0] }

	for (let i = 1; i < props.length; i++) {
		const cursor = props[i]

		// eslint-disable-next-line guard-for-in
		for (const key in cursor) {
			const a = merged[key]
			const b = cursor[key]

			if (key === 'ref') {
				merged[key] = composeRefs(a as Ref<unknown>, b as Ref<unknown>)
			} else if (key === 'style' && isRecord(a) && isRecord(b)) {
				merged[key] = { ...a, ...b }
			} else if (key === 'className' && isString(a) && isString(b)) {
				merged[key] = `${a} ${b}`
			} else if (/^on[A-Z]/.test(key) && isFunction(a) && isFunction(b)) {
				merged[key] = (...args: unknown[]) => {
					a(...args)
					b(...args)
				}
			} else {
				merged[key] = b ?? a
			}
		}
	}

	return merged as UnionToIntersection<TupleTypes<T>>
}

/**
 * A hook that composes multiple props into a single props object.
 */
export const usePropsComposed = (...props: Props[]) =>
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useMemo(() => composeProps(...props), props as DependencyList)
