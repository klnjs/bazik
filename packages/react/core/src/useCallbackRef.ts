/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { useCallback, useEffect, useRef, type DependencyList } from 'react'

/**
 * A hook that converts a callback to a ref.
 * Avoid triggering re-renders and effects when passed as a prop or dependency.
 */
export function useCallbackRef<T extends (...args: any[]) => any>(
	callback: T | undefined,
	deps: DependencyList = []
) {
	const callbackRef = useRef(callback)

	useEffect(() => {
		callbackRef.current = callback
	}, [callback])

	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useCallback(((...args) => callbackRef.current?.(...args)) as T, deps)
}
