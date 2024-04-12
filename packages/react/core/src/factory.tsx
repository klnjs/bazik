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
	type ElementType
} from 'react'
import { composeRefs } from './useRefComposed'
import { composeProps } from './usePropsComposed'
import type { AsChildProps, AsChildForwardRefComponent } from './types'

const withAsChild = (Component: ElementType) => {
	const Comp = forwardRef<unknown, AsChildProps>((props, ref) => {
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
						? composeRefs(ref, (child as any).ref)
						: (child as any).ref,
					...composeProps(otherProps, child.props)
				})
			: null
	})

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
			if (!cache.has(element)) {
				cache.set(element, withAsChild(element as ElementType))
			}

			return cache.get(element)
		}
	}) as unknown as {
		[E in keyof JSX.IntrinsicElements]: AsChildForwardRefComponent<E>
	}
}

export const poly = jsx()
