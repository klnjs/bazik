import { useId as useIdFromReact, useLayoutEffect } from 'react'

/**
 * A hook that creates a unique id.
 */
export const useId = (id?: string) => {
	const fallback = useIdFromReact()

	return id ?? fallback
}
/**
 * A hook that creates a unique id, and calls a function with the id when it changes.
 */
export const useIdAndCallback = (
	id?: string,
	setId?: (id?: string) => void
) => {
	const uid = useId(id)

	// @ts-expect-error ts(7030): Not all code paths return a value.
	useLayoutEffect(() => {
		if (setId) {
			setId(uid)

			return () => {
				setId(undefined)
			}
		}
	}, [uid, setId])

	return uid
}
