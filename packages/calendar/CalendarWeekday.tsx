import { freya, forwardRef, type CoreProps } from '../core'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDate } from './CalendarDate'

export type CalendarWeekdayProps = CoreProps<'div', { date: CalendarDate }>

export const CalendarWeekday = forwardRef<'div', CalendarWeekdayProps>(
	({ date, children, ...otherProps }, forwardedRef) => {
		const { locale } = useCalendarContext()

		return (
			<freya.div
				ref={forwardedRef}
				title={date.toLocaleString(locale, { weekday: 'long' })}
				{...otherProps}
			>
				{children ?? date.toLocaleString(locale, { weekday: 'short' })}
			</freya.div>
		)
	}
)