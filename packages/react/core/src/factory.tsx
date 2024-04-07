/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
	forwardRef,
	cloneElement,
	isValidElement,
	Children,
	type ElementType,
	type ComponentProps,
	type PropsWithChildren,
	type ForwardRefExoticComponent
} from 'react'
import { mergeRefs } from './useMergeRefs'
import { mergeProps } from './mergeProps'
import type { Assign, Pretty } from './types'

export type AsChildProps = {
	asChild?: boolean
}

export type AsChildComponentProps<E extends ElementType> = ComponentProps<E> &
	AsChildProps

export type AsChildForwardRefComponent<E extends ElementType> =
	ForwardRefExoticComponent<AsChildComponentProps<E>>

export type CoreProps<
	E extends ElementType,
	P extends object = object
> = Pretty<Assign<AsChildComponentProps<E>, P>>

const withAsChild = (Component: ElementType) => {
	const Comp = forwardRef<unknown, PropsWithChildren<AsChildProps>>(
		(props, ref) => {
			const { asChild, children, ...otherProps } = props

			if (!asChild) {
				return (
					<Component ref={ref} {...otherProps}>
						{children}
					</Component>
				)
			}

			const child = Children.only(children)

			return isValidElement(child)
				? cloneElement(child, {
						ref: ref
							? mergeRefs(ref, (child as any).ref)
							: (child as any).ref,
						...mergeProps(otherProps, child.props)
					})
				: null
		}
	)

	// @ts-expect-error - it exists
	Comp.displayName = Component.displayName || Component.name

	return Comp
}

const jsx = () => {
	const cache = new Map()

	return new Proxy(withAsChild, {
		apply(_, __, argArray) {
			return withAsChild(argArray[0])
		},
		get(_, element) {
			const asElement = element as ElementType

			if (!cache.has(asElement)) {
				cache.set(asElement, withAsChild(asElement))
			}

			return cache.get(asElement)
		}
	}) as unknown as {
		[E in keyof JSX.IntrinsicElements]: AsChildForwardRefComponent<E>
	}
}

export const poly = jsx()
