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
import { clsx } from './clsx'
import { mergeRefs } from './mergeRefs'
import { mergeProps } from './mergeProps'
import type { AsChildProps, AsChildForwardRefComponent } from './types'
import * as styles from './styles.css'

const withAsChild = (Component: ElementType) => {
	const Comp = forwardRef<
		unknown,
		AsChildProps & {
			sx?: styles.Sprinkles
			hidden?: boolean
			className?: string
		}
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
			sx ? styles.sprinkles(sx) : undefined,
			hidden ? styles.hidden : undefined
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
					ref: ref
						? mergeRefs(ref, (child as any).ref)
						: (child as any).ref,
					...mergeProps(
						{ className, hidden },
						otherProps,
						child.props
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
