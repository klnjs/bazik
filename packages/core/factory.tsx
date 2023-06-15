/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

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
import { clsx } from './clsx'
import { mergeRefs } from './mergeRefs'
import { mergeProps } from './mergeProps'
import {
	factoryHidden,
	factorySprinkles,
	type FactorySprinkles
} from './factory.css'
import type { Assign } from './types'

export type AsChildProps = {
	asChild?: boolean
	sx?: FactorySprinkles
	hidden?: boolean
	className?: string
}

export type AsChildComponentProps<
	E extends ElementType,
	P extends object = object
> = Assign<ComponentProps<E>, AsChildProps & P>

export type AsChildForwardRefComponent<
	E extends ElementType,
	P extends object = object
> = ForwardRefExoticComponent<AsChildComponentProps<E, P>>

const withAsChild = (Component: React.ElementType) => {
	const Comp = forwardRef<unknown, PropsWithChildren<AsChildProps>>(
		(props, ref) => {
			const {
				asChild,
				sx,
				hidden,
				className: classNameProp,
				children,
				...otherProps
			} = props

			const className = clsx(
				classNameProp,
				sx ? factorySprinkles(sx) : undefined,
				hidden ? factoryHidden : undefined
			)

			if (!asChild) {
				return <Component {...props} ref={ref} className={className} />
			}

			const onlyChild = Children.only(children)

			return isValidElement(onlyChild)
				? cloneElement(onlyChild, {
						...mergeProps(otherProps, onlyChild.props as any),
						// @ts-expect-error not sure why this fails
						ref: ref
							? mergeRefs(ref, (onlyChild as any).ref)
							: (onlyChild as any).ref,
						hidden,
						className
				  })
				: null
		}
	)

	// @ts-expect-error - it exists
	Comp.displayName = Component.displayName || Component.name

	return Comp
}

export const jsxFactory = () => {
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

export const freya = jsxFactory()
