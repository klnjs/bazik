import type {
	ReactNode,
	ElementType,
	ComponentProps,
	ComponentPropsWithoutRef,
	ForwardRefExoticComponent
} from 'react'

export type Assign<T, P> = Omit<T, keyof P> & P

export type Pretty<T> = T extends infer U ? { [K in keyof U]: U[K] } : never

export type AsChildProps = {
	asChild?: boolean
	children?: ReactNode | undefined
}

export type AsChildComponentProps<E extends ElementType> = AsChildProps &
	ComponentProps<E>

export type AsChildComponentPropsWithoutRef<E extends ElementType> =
	AsChildProps & ComponentPropsWithoutRef<E>

export type AsChildForwardRefComponent<E extends ElementType> =
	ForwardRefExoticComponent<AsChildComponentProps<E>>

export type CoreProps<
	E extends ElementType,
	P extends object = object
> = Pretty<Assign<AsChildComponentProps<E>, P>>
