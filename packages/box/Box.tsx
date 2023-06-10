import {
	forwardRef,
	type ElementType,
	type ReactElement,
	type HTMLAttributes
} from 'react'
import clsx from 'clsx'
import type { PolymorphicRef, PolymorphicPropsWithRef } from '../component'
import { boxSprinkles, type BoxSprinkles } from './Box.css'

export const boxAs = 'div'

export type BoxProps<C extends ElementType> = PolymorphicPropsWithRef<
	C,
	BoxSprinkles
>

export type BoxComponent = <C extends ElementType = typeof boxAs>(
	props: BoxProps<C>
) => ReactElement

export const Box = forwardRef(
	<C extends ElementType = typeof boxAs>(
		{ as, children, className: classNameProp, ...otherProps }: BoxProps<C>,
		forwardedRef: PolymorphicRef<C>
	) => {
		const Component = as ?? boxAs
		const { componentProps, sprinklesProps } =
			extractBoxProps<C>(otherProps)
		const className = clsx(classNameProp, boxSprinkles(sprinklesProps))

		return (
			<Component
				ref={forwardedRef}
				className={className}
				{...componentProps}
			>
				{children}
			</Component>
		)
	}
)

export const extractBoxProps = <C extends ElementType = 'div'>(
	props: object
) => {
	const componentProps: HTMLAttributes<C> = {}
	const sprinklesProps: BoxSprinkles = {}

	Object.keys(props).forEach((key) => {
		if (isBoxSprinkle(key)) {
			sprinklesProps[key] = props[key]
		} else {
			componentProps[key] = props[key]
		}
	})

	return { componentProps, sprinklesProps }
}

export const isBoxSprinkle = (key: string): key is keyof BoxSprinkles =>
	boxSprinkles.properties.has(key as keyof BoxSprinkles)
