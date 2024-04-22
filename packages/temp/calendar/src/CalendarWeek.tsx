import { poly, forwardRef, type CoreProps } from '@klnjs/core'
import { useCalendarContext } from './CalendarContext'
import { getWeekOfYear } from './calendar-functions'
import type { Date } from './calendar-types'

export type CalendarWeekProps = CoreProps<'div', { date: Date }>

export const CalendarWeek = forwardRef<'div', CalendarWeekProps>(
	({ date, children, ...otherProps }, forwardedRef) => {
		const { locale } = useCalendarContext()

		return (
			<poly.div ref={forwardedRef} {...otherProps}>
				{children ?? getWeekOfYear(date, locale)}
			</poly.div>
		)
	}
)
