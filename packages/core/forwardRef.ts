import {
	forwardRef as fr,
	type ElementRef,
	type ElementType,
	type ComponentProps,
	type ForwardRefRenderFunction,
} from 'react'
import type { Assign } from './types'

export const forwardRef = <
	E extends ElementType,
	P extends Record<never, never> = Record<never, never>
>(
	component: ForwardRefRenderFunction<
		ElementRef<E>,
		Assign<ComponentProps<E>, P>
	>
) => fr(component)
