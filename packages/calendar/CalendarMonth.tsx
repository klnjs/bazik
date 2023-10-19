import { useMemo } from 'react'
import { Temporal } from 'temporal-polyfill'
import { freya, forwardRef, type CoreProps } from '../core'
import { useCalendarContext } from './CalendarContext'
import { CalendarMonthProvider } from './CalendarMonthContext'

export type CalendarMonthProps = CoreProps<
	'div',
	{ year?: number; month?: number }
>

export const CalendarMonth = forwardRef<'div', CalendarMonthProps>(
	({ year, month, ...otherProps }, forwardedRef) => {
		const { highlighted } = useCalendarContext()

		const value = useMemo(
			() =>
				new Temporal.PlainYearMonth(
					year ?? highlighted.year,
					month ?? highlighted.month
				),
			[year, month, highlighted]
		)

		return (
			<CalendarMonthProvider value={value}>
				<freya.div ref={forwardedRef} {...otherProps} />
			</CalendarMonthProvider>
		)
	}
)
