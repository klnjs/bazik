import {
	useCallback,
	type Ref,
	type MutableRefObject,
	type DependencyList,
	type RefCallback
} from 'react'
import { isSet, isFunction } from '@klnjs/assertion'

export type ComposableRef<T> = Ref<T> | undefined | null

export const composeRefs =
	<T>(...refs: ComposableRef<T>[]): RefCallback<T> =>
	(value: T) => {
		refs.forEach((ref) => {
			// prettier-ignore
			if (isFunction(ref)) {
				ref(value)
			} else if (isSet(ref)) {
				(ref as MutableRefObject<T>).current = value
			}
		})
	}

/**
 * A hook that composes multiple refs into a single ref.
 */
export const useRefComposed = <T>(...refs: ComposableRef<T>[]) =>
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useCallback(composeRefs(...refs), refs as DependencyList)
