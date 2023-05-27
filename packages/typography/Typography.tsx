import { forwardRef, type ReactElement, type ElementType } from 'react'
import { clsx } from 'clsx'
import {
	type PolymorphicComponentProp,
	type PolymorphicComponentPropWithRef,
	type PolymorphicRef
} from '../utils/Component'
import * as classes from './Typography.css'

export type TypographyPropsBase = Parameters<
	typeof classes.typographySprinkles
>[0]

export type TypographyProps<C extends ElementType = 'span'> =
	PolymorphicComponentPropWithRef<C, TypographyPropsBase>

export type TypographyComponent = <C extends ElementType = 'span'>(
	props: TypographyProps<C>
) => ReactElement | null

export const Typography: TypographyComponent = forwardRef(function Typography<
	C extends ElementType = 'span'
>(
	{
		as,
		children,
		color,
		fontSize,
		fontWeight,
		textAlign,
		textTransform,
		textDecoration,
		className: classNameProp,
		...otherProps
	}: PolymorphicComponentProp<C, TypographyProps>,
	forwardedRef: PolymorphicRef<C>
) {
	const Component = as ?? 'span'
	const className = clsx(
		classNameProp,
		classes.typographyRoot,
		classes.typographySprinkles({
			color,
			fontSize,
			fontWeight,
			textAlign,
			textTransform,
			textDecoration
		})
	)

	return (
		<Component ref={forwardedRef} className={className} {...otherProps}>
			{children}
		</Component>
	)
})
