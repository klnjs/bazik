import {
	useCallback,
	type EventHandler,
	type SyntheticEvent,
	type DependencyList
} from 'react'

export type ChainableEventHandler<E extends SyntheticEvent> =
	| EventHandler<E>
	| undefined

export const createChainHandler =
	<E extends SyntheticEvent>(...chainables: ChainableEventHandler<E>[]) =>
	(event: E) => {
		chainables.forEach((chainable) => {
			if (chainable && !event.defaultPrevented) {
				chainable(event)
			}
		})
	}

/**
 * A hook that composes multiple event handlers into a single handler.
 */
export const useChainHandler = <E extends SyntheticEvent>(
	...chainables: ChainableEventHandler<E>[]
) =>
	useCallback(createChainHandler(...chainables), chainables as DependencyList)
