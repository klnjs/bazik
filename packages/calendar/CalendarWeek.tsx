import { freya, forwardRef, type CoreProps } from '../core'
import { useCalendarContext } from './CalendarContext'
import type { DateTime } from './CalendarDateTime'

export type CalendarTitleProps = CoreProps<'div', { date: DateTime }>

export const CalendarWeek = forwardRef<'div', CalendarTitleProps>(
	({ date, children, ...otherProps }, forwardedRef) => {
		const { locale } = useCalendarContext()

		return (
			<freya.div ref={forwardedRef} {...otherProps}>
				{children ?? date.getWeekOfYear(locale)}
			</freya.div>
		)
	}
)
