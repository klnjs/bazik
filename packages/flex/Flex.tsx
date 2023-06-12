import { clsx } from 'clsx'
import { poly, type PolyProps } from '../component/poly'
import { flexSprinkles, type FlexSprinkles } from './Flex.css'

export type FlexProps = FlexSprinkles &
	Pick<PolyProps, 'sx' | 'style' | 'children' | 'className'>

export const Flex = ({
	display,
	flexWrap,
	flexGrow,
	flexShrink,
	flexDirection,
	alignItems,
	alignContent,
	justifyContent,
	gap,
	children,
	className: classNameProp,
	...otherProps
}: FlexProps) => {
	const className = clsx(
		classNameProp,
		flexSprinkles({
			display,
			flexWrap,
			flexGrow,
			flexShrink,
			flexDirection,
			alignItems,
			alignContent,
			justifyContent,
			gap
		})
	)

	return (
		<poly.div className={className} {...otherProps}>
			{children}
		</poly.div>
	)
}
