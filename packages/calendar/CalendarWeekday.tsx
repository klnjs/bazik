import { freya, forwardRef, type CoreProps } from '../core'
import { useCalendarContext } from './CalendarContext'
import type { DateTime } from './CalendarDateTime'

export type CalendarTitleProps = CoreProps<'abbr', { date: DateTime }>

export const CalendarWeekday = forwardRef<'abbr', CalendarTitleProps>(
	({ date, children, ...otherProps }, forwardedRef) => {
		const { locale } = useCalendarContext()

		return (
			<freya.abbr
				ref={forwardedRef}
				title={date.toLocaleString(locale, { weekday: 'long' })}
				{...otherProps}
			>
				{children ?? date.toLocaleString(locale, { weekday: 'short' })}
			</freya.abbr>
		)
	}
)
