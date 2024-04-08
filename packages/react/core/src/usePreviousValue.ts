import { useRef } from 'react'

export const usePreviousValue = <T>(value: T) => {
	const ref = useRef<T>(value)
	const refPrevious = useRef<T | null>(null)

	const current = ref.current

	if (value !== current) {
		ref.current = value
		refPrevious.current = current
	}

	return refPrevious.current
}
