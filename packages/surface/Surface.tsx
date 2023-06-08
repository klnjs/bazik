import { forwardRef, type ReactNode, type ElementType } from 'react'
import { clsx } from 'clsx'
import {
	createComponent,
	type PolymorphicRef
	type PolymorphicComponentPropWithRef,
} from '../utils/Component'
import * as classes from './Surface.css'

export type SurfaceProps<C extends ElementType> = PolymorphicComponentPropWithRef<
	C,
	Parameters<typeof classes.sprinkles>[0]
>
export type SurfaceComponent = <C extends ElementType = 'div'>(
	props: SurfaceProps<C>
) => ReactNode

export const Surface: SurfaceComponent = createComponent(
	'Surface',
	forwardRef(
		<C extends ElementType = 'div'>(
			{
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
			}: SurfaceProps<C>,
			forwardedRef: PolymorphicRef<C>
		) => {
			const Component = as ?? 'div'
			const className = clsx(
				classNameProp,
				classes.sprinkles({
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
				<Component
					ref={forwardedRef}
					className={className}
					{...otherProps}
				>
					{children}
				</Component>
			)
		}
	)
)
