import type { ElementType } from 'react'
import { clsx } from 'clsx'
import type { PolymorphicComponentProp } from '../utils/Component'
import * as classes from './Card.css'

export type CardProps = Parameters<typeof classes.cardSprinkels>[0]

export const Card = <C extends ElementType = 'div'>({
	id,
	as,
	boxShadow = 1,
	margin,
	marginBlock,
	marginInline,
	marginBlockEnd,
	marginBlockStart,
	marginInlineEnd,
	marginInlineStart,
	padding = 2,
	paddingBlock,
	paddingInline,
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
			boxShadow,
			margin,
			marginBlock,
			marginInline,
			marginBlockEnd,
			marginBlockStart,
			marginInlineEnd,
			marginInlineStart,
			padding,
			paddingBlock,
			paddingInline,
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
