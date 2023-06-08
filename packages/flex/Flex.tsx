import { forwardRef, type ReactNode, type ElementType } from 'react'
import { clsx } from 'clsx'
import type {
	PolymorphicComponentPropWithRef,
	PolymorphicRef
} from '../utils/Component'
import * as classes from './Flex.css'

export type FlexProps<C extends ElementType> = PolymorphicComponentPropWithRef<
	C,
	Parameters<typeof classes.flexSprinkles>[0]
>

export type FlexComponent = <C extends ElementType = 'div'>(
	props: FlexProps<C>
) => ReactNode

export const Flex: FlexComponent = forwardRef(
	<C extends ElementType = 'div'>(
		{
			as,
			alignItems,
			children,
			className: classNameProp,
			display = 'flex',
			flexDirection,
			flexGrow,
			flexShrink,
			flexWrap,
			gap,
			style,
			justifyContent,
			...otherProps
		}: FlexProps<C>,
		forwardedRef: PolymorphicRef<C>
	) => {
		const Component = as ?? 'div'
		const className = clsx(
			classNameProp,
			classes.flexSprinkles({
				alignItems,
				display,
				flexDirection,
				flexGrow,
				flexShrink,
				flexWrap,
				gap,
				justifyContent
			})
		)

		return (
			<Component
				ref={forwardedRef}
				style={style}
				className={className}
				{...otherProps}
			>
				{children}
			</Component>
		)
	}
)
