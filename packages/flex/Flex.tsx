import { clsx } from 'clsx'
import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { flexSprinkles, type FlexSprinkles } from './Flex.css'

export type FlexProps = AsChildComponentProps<'div', FlexSprinkles>

export const Flex = forwardRef<'div', FlexProps>(
	(
		{
			display = 'flex',
			flexWrap,
			flexDirection,
			alignItems,
			alignContent,
			justifyContent,
			gap,
			children,
			className: classNameProp,
			...otherProps
		},
		forwardedRef
	) => {
		const className = clsx(
			classNameProp,
			flexSprinkles({
				display,
				flexWrap,
				flexDirection,
				alignItems,
				alignContent,
				justifyContent,
				gap
			})
		)

		return (
			<freya.div ref={forwardedRef} className={className} {...otherProps}>
				{children}
			</freya.div>
		)
	}
)
