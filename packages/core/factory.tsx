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
import { clsx } from 'clsx'
import { mergeRefs } from './mergeRefs'
import { mergeProps } from './mergeProps'
import { factorySprinkles, type FactorySprinkles } from './factory.css'
import type { Assign } from './types'

export type AsChildProps = {
	asChild?: boolean
	sx?: FactorySprinkles
	className?: string
}

export type AsChildComponentProps<
	E extends ElementType,
	P extends object = {}
> = Assign<ComponentProps<E>, AsChildProps & P>

export type AsChildForwardRefComponent<
	E extends ElementType,
	P extends object = {}
> = ForwardRefExoticComponent<AsChildComponentProps<E, P>>

const withAsChild = (Component: React.ElementType) => {
	const Comp = forwardRef<unknown, PropsWithChildren<AsChildProps>>(
		(props, ref) => {
			const {
				asChild,
				sx = {},
				className: classNameProp,
				children,
				...restProps
			} = props

			const className = clsx(classNameProp, factorySprinkles(sx))

			if (!asChild) {
				return <Component {...props} ref={ref} className={className} />
			}

			const onlyChild = Children.only(children)

			return isValidElement(onlyChild)
				? cloneElement(onlyChild, {
						...mergeProps(restProps, onlyChild.props as any),
						// @ts-expect-error not sure why this fails
						ref: ref
							? mergeRefs(ref, (onlyChild as any).ref)
							: (onlyChild as any).ref,
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
		apply(target, thisArg, argArray) {
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
