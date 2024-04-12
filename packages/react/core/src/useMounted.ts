import { useRef } from 'react'

/**
 * A hook that returns if a component is mounted.
 * Avoid re-renders and executing effects on first render.
 */
export const useMounted = () => {
	const mounted = useRef(false)

	if (!mounted.current) {
		mounted.current = true

		return false
	}

	return mounted.current
}
