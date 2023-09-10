import type { Temporal } from 'temporal-polyfill'
import { freya, forwardRef, type CoreProps } from '../core'
import { useCalendarContext } from './CalendarContext'
import * as fns from './CalendarHelpers'

export type CalendarTitleProps = CoreProps<'div', { date: Temporal.PlainDate }>

export const CalendarWeek = forwardRef<'div', CalendarTitleProps>(
	({ date, children, ...otherProps }, forwardedRef) => {
		const { locale } = useCalendarContext()

		return (
			<freya.div ref={forwardedRef} {...otherProps}>
				{children ?? fns.getWeekOfYear(date, locale)}
			</freya.div>
		)
	}
)
