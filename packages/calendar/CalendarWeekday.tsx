import { freya, forwardRef, type CoreProps } from '../core'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDate } from './CalendarDate'

export type CalendarTitleProps = CoreProps<'abbr', { date: CalendarDate }>

export const CalendarWeekday = forwardRef<'abbr', CalendarTitleProps>(
	({ date, children, ...otherProps }, forwardedRef) => {
		const { locale } = useCalendarContext()

		return (
			<freya.abbr
				ref={forwardedRef}
				title={date.format(locale, { weekday: 'long' })}
				{...otherProps}
			>
				{children ?? date.format(locale, { weekday: 'short' })}
			</freya.abbr>
		)
	}
)
