import type { Ref, MutableRefObject } from 'react'

const setRef = <T>(ref: Ref<T> | undefined, value: T) => {
	if (typeof ref === 'function') {
		ref(value)
	} else if (ref !== null && ref !== undefined) {
		// prettier-ignore
		(ref as MutableRefObject<T>).current = value
	}
}

export const mergeRefs =
	<T>(...refs: (Ref<T> | undefined)[]) =>
	(node: T) =>
		refs.forEach((ref) => setRef(ref, node))
