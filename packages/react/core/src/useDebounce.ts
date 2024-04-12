import { useState, useEffect } from 'react'

/**
 * A hook that debounces a value with a delay.
 * Avoid triggering re-renders and effects during user interaction.
 */
export function useDebounce<T>(value: T, delay = 100) {
	const [debounced, setDebounced] = useState<T>(value)

	useEffect(() => {
		const timeout = setTimeout(() => setDebounced(value), delay)

		return () => {
			clearTimeout(timeout)
		}
	}, [value, delay])

	return debounced
}
