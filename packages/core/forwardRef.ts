import {
	forwardRef as fr,
	type ElementType,
	type ForwardRefRenderFunction
} from 'react'
import type {
	AsChildRef,
	AsChildComponentProps,
	AsChildForwardRefComponent
} from './types'

export const forwardRef = <
	E extends ElementType,
	P extends Record<never, never> = Record<never, never>
>(
	component: ForwardRefRenderFunction<
		AsChildRef<E>,
		AsChildComponentProps<E, P>
	>
) => fr(component) as AsChildForwardRefComponent<E, P>
