import { useId as useIdFromReact, useLayoutEffect } from 'react'

/**
 * A hook that creates a unique id, and optionally calls setId function with the id.
 * @param id - An optional id.
 * @param setId - A function to call with the id, will be called with undefined on unmount.
 */
export function useId(id?: string, setId?: (id?: string) => void): string {
	const rid = useIdFromReact()
	const uid = id ?? rid

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
