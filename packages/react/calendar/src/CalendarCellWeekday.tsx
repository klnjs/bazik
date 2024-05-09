import { poly, forwardRef, type CoreProps } from '@klnjs/core'
import { useCalendarContext } from './CalendarContext'
import type { CalendarCellProps } from './CalendarCell'

export type CalendarCellWeekdayProps = CoreProps<'div', CalendarCellProps>

export const CalendarCellWeekday = forwardRef<'div', CalendarCellWeekdayProps>(
	({ type, date, children, ...otherProps }, forwardedRef) => {
		const { calendar, locale } = useCalendarContext()

		return (
			<poly.abbr
				ref={forwardedRef}
				data-cell="weekday"
				title={date.toLocaleString(locale, {
					calendar,
					weekday: 'long'
				})}
				{...otherProps}
			>
				{children ??
					date.toLocaleString(locale, { calendar, weekday: 'short' })}
			</poly.abbr>
		)
	}
)
