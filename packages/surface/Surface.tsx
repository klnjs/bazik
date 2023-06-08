import type { ElementType } from 'react'
import { clsx } from 'clsx'
import type { PolymorphicComponentProp } from '../utils/Component'
import * as classes from './Surface.css'

export type SurfaceProps = Parameters<typeof classes.surfaceSprinkels>[0]

export const Surface = <C extends ElementType = 'div'>({
	as,
	color = 'primary',
	radius = 1,
	elevation = 1,
	margin,
	marginBlock,
	marginInline,
	marginBlockEnd,
	marginBlockStart,
	marginInlineEnd,
	marginInlineStart,
	padding = 1,
	paddingBlock,
	paddingInline,
	paddingBlockEnd,
	paddingBlockStart,
	paddingInlineEnd,
	paddingInlineStart,
	children,
	className: classNameProp,
	...otherProps
}: PolymorphicComponentProp<C, SurfaceProps>) => {
	const Component = as ?? 'div'
	const className = clsx(
		classNameProp,
		classes.surfaceSprinkels({
			color,
			radius,
			elevation,
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
		<Component className={className} {...otherProps}>
			{children}
		</Component>
	)
}
