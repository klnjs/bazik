import { freya, forwardRef, type AsChildComponentProps } from '../core'

export type CalendarGridProps = AsChildComponentProps<
	'div',
	{
		columns?: number
	}
>

export const CalendarGrid = forwardRef<'div', CalendarGridProps>(
	({ columns = 7, style, ...otherProps }, forwardedRef) => (
		<freya.div
			ref={forwardedRef}
			style={{
				display: 'grid',
				gridTemplateColumns: `repeat(${columns}, 1fr)`,
				...style
			}}
			{...otherProps}
		/>
	)
)
