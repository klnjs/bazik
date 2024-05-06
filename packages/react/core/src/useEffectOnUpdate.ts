import { useEffect, type EffectCallback, type DependencyList } from 'react'
import { useMounted } from './useMounted'

/**
 * Runs the given effect only after the component updates.
 */
export const useEffectOnUpdate = (
	effect: EffectCallback,
	deps?: DependencyList
) => {
	const isMounted = useMounted()

	useEffect(() => {
		if (isMounted) {
			return effect()
		}
	}, deps)
}
