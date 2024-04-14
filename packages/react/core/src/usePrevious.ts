import { useRef } from 'react'

/**
 * A hook that returns the value from the previous render.
 */
export const usePrevious = <T>(value: T) => {
	const ref = useRef<T>(value)
	const refPrevious = useRef<T | null>(null)

	const { current } = ref

	if (value !== current) {
		ref.current = value
		refPrevious.current = current
	}

	return refPrevious.current
}
