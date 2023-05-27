import { type ElementType } from 'react'
import { clsx } from 'clsx'
import { type PolymorphicComponentProp } from '../utils/Component'
import * as classes from './Card.css'

export type CardProps = Parameters<typeof classes.cardSprinkels>[0]

export const Card = <C extends ElementType = 'div'>({
	id,
	as,
	margin,
	marginBlockEnd,
	marginBlockStart,
	marginInlineEnd,
	marginInlineStart,
	padding = 2,
	paddingBlockEnd,
	paddingBlockStart,
	paddingInlineEnd,
	paddingInlineStart,
	children,
	className: classNameProp,
	...otherProps
}: PolymorphicComponentProp<C, CardProps>) => {
	const Component = as ?? 'div'
	const className = clsx(
		classNameProp,
		classes.cardRoot,
		classes.cardSprinkels({
			margin,
			marginBlockEnd,
			marginBlockStart,
			marginInlineEnd,
			marginInlineStart,
			padding,
			paddingBlockEnd,
			paddingBlockStart,
			paddingInlineEnd,
			paddingInlineStart
		})
	)

	return (
		<Component id={id} className={className} {...otherProps}>
			{children}
		</Component>
	)
}
