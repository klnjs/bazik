import {
	forwardRef as forwardRefFromReact,
	type ElementRef,
	type ElementType,
	type ForwardRefRenderFunction,
	type ForwardRefExoticComponent
} from 'react'
import type {
	Assign,
	AsChildComponentProps,
	AsChildComponentPropsWithoutRef
} from './types'

export const forwardRef = <
	E extends ElementType,
	P extends Record<never, never> = Record<never, never>
>(
	component: ForwardRefRenderFunction<
		ElementRef<E>,
		Assign<AsChildComponentPropsWithoutRef<E>, P>
	>
) =>
	forwardRefFromReact(component) as ForwardRefExoticComponent<
		Assign<AsChildComponentProps<E>, P>
	>
