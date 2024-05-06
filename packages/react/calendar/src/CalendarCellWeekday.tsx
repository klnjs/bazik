import { poly, forwardRef, type CoreProps } from '@klnjs/core'
import { useCalendarContext } from './CalendarContext'
import type { CalendarCellProps } from './CalendarCell'

export type CalendarCellWeekdayProps = CoreProps<'div', CalendarCellProps>

export const CalendarCellWeekday = forwardRef<'div', CalendarCellWeekdayProps>(
	({ type, date, children, ...otherProps }, forwardedRef) => {
		const { locale } = useCalendarContext()

		return (
			<poly.div
				ref={forwardedRef}
				title={date.toLocaleString(locale, { weekday: 'long' })}
				data-cell="weekday"
				{...otherProps}
			>
				{children ?? date.toLocaleString(locale, { weekday: 'short' })}
			</poly.div>
		)
	}
)
