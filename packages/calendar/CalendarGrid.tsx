import { freya, forwardRef, type CoreProps } from '../core'

export type CalendarGridProps = CoreProps<'div'>

export const CalendarGrid = forwardRef<'div', CalendarGridProps>(
	({ style, ...otherProps }, forwardedRef) => (
		<freya.div
			ref={forwardedRef}
			style={{
				display: 'grid',
				gridTemplateColumns: `repeat(7, 1fr)`,
				...style
			}}
			{...otherProps}
		/>
	)
)
