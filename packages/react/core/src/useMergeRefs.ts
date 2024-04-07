import { useMemo, type Ref, type RefCallback } from 'react'

export type MergeRef<T> = Ref<T> | undefined | null

export const setRef = <T>(ref: MergeRef<T>, value: T) => {
	if (typeof ref === 'function') {
		ref(value)
	} else if (ref !== undefined && ref !== null) {
		// @ts-expect-error ignore
		ref.current = value
	}
}

export const mergeRefs =
	<T>(...refs: MergeRef<T>[]) =>
	(value: T) => {
		refs.forEach((ref) => setRef(ref, value))
	}

export const useMergeRefs = <T>(
	...refs: MergeRef<T>[]
): RefCallback<T> | null =>
	useMemo(() => {
		if (refs.every((ref) => ref === undefined || ref === null)) {
			return null
		}

		return mergeRefs(...refs)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, refs)
