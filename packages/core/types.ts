/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
	ElementRef,
	ElementType,
	ComponentPropsWithRef,
	PropsWithChildren,
	ForwardRefExoticComponent
} from 'react'

export type Props = Record<string, any>

export type Pretty<T> = T extends infer U ? { [K in keyof U]: U[K] } : never

export type Assign<T, P> = Omit<T, keyof P> & P

export type AsChildRef<E extends ElementType> = ElementRef<E>

export type AsChildProps = PropsWithChildren<{
	asChild?: boolean
}>

export type ComponentProps<
	E extends ElementType,
	P extends Props = object
> = Pretty<Assign<ComponentPropsWithRef<E>, P>>

export type AsChildComponentProps<
	E extends ElementType,
	P extends Props = object
> = Pretty<ComponentProps<E, Assign<AsChildProps, P>>>

export type AsChildForwardRefComponent<
	E extends ElementType,
	P extends Props = object
> = ForwardRefExoticComponent<AsChildComponentProps<E, P>>
