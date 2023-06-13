import {
	forwardRef as fr,
	type ElementRef,
	type ElementType,
	type ComponentPropsWithoutRef,
	type ForwardRefRenderFunction,
	type ForwardRefExoticComponent
} from 'react'
import type { Assign } from './types'
import type { AsChildComponentProps, AsChildProps } from './factory'

export const forwardRef = <
	E extends ElementType,
	P extends Record<never, never> = Record<never, never>
>(
	component: ForwardRefRenderFunction<
		ElementRef<E>,
		Assign<ComponentPropsWithoutRef<E>, P & AsChildProps>
	>
) =>
	fr(component) as unknown as ForwardRefExoticComponent<
		Assign<AsChildComponentProps<E>, P>
	>
