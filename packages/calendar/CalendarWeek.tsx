import type { Temporal } from 'temporal-polyfill'
import { freya, forwardRef, type CoreProps } from '../core'
import { useCalendarContext } from './CalendarContext'
import { getWeekOfYear } from './useCalendarTemporal'

export type CalendarWeekProps = CoreProps<'div', { date: Temporal.PlainDate }>

export const CalendarWeek = forwardRef<'div', CalendarWeekProps>(
	({ date, children, ...otherProps }, forwardedRef) => {
		const { locale } = useCalendarContext()

		return (
			<freya.div ref={forwardedRef} {...otherProps}>
				{children ?? getWeekOfYear(date, locale)}
			</freya.div>
		)
	}
)
