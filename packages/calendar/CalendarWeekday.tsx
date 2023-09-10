import type { Temporal } from 'temporal-polyfill'
import { freya, forwardRef, type CoreProps } from '../core'
import { useCalendarContext } from './CalendarContext'

export type CalendarTitleProps = CoreProps<'abbr', { date: Temporal.PlainDate }>

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
