import { useId as useIdFromReact } from 'react'

/**
 * A hook that generates a unique id or uses a predetermined one.
 * Avoid id not being accessible when passed as a prop.
 */
export const useId = (id?: string) => {
	const fallback = useIdFromReact()

	return id ?? fallback
}
