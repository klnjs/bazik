import { useRef } from 'react'

/**
 * A hook to find out if a component is mounted.
 */
export const useMounted = () => {
	const mounted = useRef(false)

	if (!mounted.current) {
		mounted.current = true

		return false
	}

	return mounted.current
}
