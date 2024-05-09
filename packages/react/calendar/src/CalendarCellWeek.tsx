import { poly, forwardRef, type CoreProps } from '@klnjs/core'
import { getWeekOfYear } from '@klnjs/temporal'
import { useCalendarContext } from './CalendarContext'
import type { CalendarCellProps } from './CalendarCell'

export type CalendarCellWeekProps = CoreProps<'div', CalendarCellProps>

export const CalendarCellWeek = forwardRef<'div', CalendarCellWeekProps>(
	({ type, date, children, ...otherProps }, forwardedRef) => {
		const { locale } = useCalendarContext()

		const content = children ?? getWeekOfYear(date, locale)

		return (
			<poly.div ref={forwardedRef} data-cell="week" {...otherProps}>
				{content}
			</poly.div>
		)
	}
)
