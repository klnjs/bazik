/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
	ElementRef,
	ElementType,
	ComponentProps,
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

export type AsChildComponentProps<
	E extends ElementType,
	P extends object = object
> = Pretty<Assign<ComponentProps<E>, Assign<AsChildProps, P>>>

export type AsChildForwardRefComponent<
	E extends ElementType,
	P extends object = object
> = ForwardRefExoticComponent<AsChildComponentProps<E, P>>
