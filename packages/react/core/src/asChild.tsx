import {
	cloneElement,
	isValidElement,
	Children,
	type ReactNode,
	type ElementType,
	type FunctionComponent,
	type ComponentPropsWithRef
} from 'react'
import type { Assign, Pretty } from './types'
import { composeProps, type Props } from './usePropsComposed'

type AsChildProps = {
	asChild?: boolean
	children?: ReactNode | undefined
}

type AsChildComponentProps<E extends ElementType> = AsChildProps &
	ComponentPropsWithRef<E>

type AsChildComponent<E extends ElementType> = FunctionComponent<
	AsChildComponentProps<E>
>

const withAsChild =
	(Element: keyof JSX.IntrinsicElements) =>
	({ asChild, children, ...otherProps }: AsChildProps) => {
		if (!asChild) {
			return <Element {...otherProps}>{children}</Element>
		}

		const child = Children.only(children)

		return isValidElement(child)
			? cloneElement(
					child,
					composeProps(otherProps, child.props as Props)
				)
			: null
	}

const proxyAsChild = () => {
	const cache = new Map<string | symbol, ReturnType<typeof withAsChild>>()

	return new Proxy(withAsChild, {
		get(_, element) {
			if (!cache.has(element)) {
				cache.set(
					element,
					withAsChild(element as keyof JSX.IntrinsicElements)
				)
			}

			return cache.get(element)
		}
	}) as unknown as {
		[E in keyof JSX.IntrinsicElements]: AsChildComponent<E>
	}
}

export const poly = proxyAsChild()

export type PolyProps<
	E extends ElementType,
	P extends object = object
> = Pretty<Assign<AsChildComponentProps<E>, P>>
