import {
	forwardRef as forwardRefReact,
	type ElementRef,
	type ElementType,
	type ComponentPropsWithoutRef,
	type ForwardRefRenderFunction
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
	forwardRefReact(component) as unknown as React.ForwardRefExoticComponent<
		Assign<AsChildComponentProps<E>, P>
	>
