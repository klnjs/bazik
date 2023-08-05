import { freya, forwardRef, type CoreProps } from '../core'
import { useCalendarContext } from './CalendarContext'

export type CalendarGridProps = CoreProps<'div'>

export const CalendarGrid = forwardRef<'div', CalendarGridProps>(
	(props, forwardedRef) => {
		const { titleId } = useCalendarContext()

		return (
			<freya.div
				ref={forwardedRef}
				role="grid"
				aria-labelledby={titleId}
				{...props}
			/>
		)
	}
)
