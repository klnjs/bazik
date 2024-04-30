import {
	cloneElement,
	isValidElement,
	Children,
	type ComponentType,
	type FunctionComponent
} from 'react'
import { composeProps, type Props } from './usePropsComposed'
import type { AsChildComponent, AsChildProps } from './types'

const withAsChild = (Component: ElementT) => {
	const Comp = ({ asChild, children, ...otherProps }: AsChildProps) => {
		if (!asChild) {
			return <Component {...otherProps}>{children}</Component>
		}

		const child = Children.only(children)

		return isValidElement(child)
			? cloneElement(
					child,
					composeProps(otherProps, child.props as Props)
				)
			: null
	}

	Comp.displayName = Component.displayName ?? Component.name

	return Comp
}

const jsx = () => {
	const cache = new Map<string | symbol, FunctionComponent<AsChildProps>>()

	return new Proxy(withAsChild, {
		apply(_, __, argArray) {
			return withAsChild(argArray[0] as FunctionComponent<AsChildProps>)
		},
		get(_, element) {
			if (!cache.has(element)) {
				cache.set(
					element,
					withAsChild(element as FunctionComponent<AsChildProps>)
				)
			}

			return cache.get(element)
		}
	}) as unknown as {
		[E in keyof JSX.IntrinsicElements]: AsChildComponent<E>
	}
}

export const poly = jsx()

const test = () => <poly.div asChild />
