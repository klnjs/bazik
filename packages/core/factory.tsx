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
import { coreHidden, coreSprinkles, type CoreSprinkles } from './core.css'
import type { Assign } from './types'

export type AsChildProps = {
	asChild?: boolean
}

export type AsChildComponentProps<
	E extends ElementType,
	P extends object = object
> = Assign<ComponentProps<E>, AsChildProps & P>

export type AsChildForwardRefComponent<
	E extends ElementType,
	P extends object = object
> = ForwardRefExoticComponent<AsChildComponentProps<E, P>>

const withAsChild = (Component: ElementType) => {
	const Comp = forwardRef<
		unknown,
		PropsWithChildren<
			AsChildProps & {
				sx?: CoreSprinkles
				hidden?: boolean
				className?: string
			}
		>
	>((props, ref) => {
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
			sx ? coreSprinkles(sx) : undefined,
			hidden ? coreHidden : undefined
		)

		if (!asChild) {
			return (
				<Component ref={ref} className={className} {...otherProps}>
					{children}
				</Component>
			)
		}

		const child = Children.only(children)

		return isValidElement(child)
			? cloneElement(child, {
					// @ts-expect-error not sure why this fails
					ref: ref
						? mergeRefs(ref, (child as any).ref)
						: (child as any).ref,
					...mergeProps(
						{ className, hidden },
						otherProps,
						child.props as any
					)
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

export const freya = jsx()
