import { freya, forwardRef, type CoreProps } from '../core'
import { CalendarMonthProvider } from './CalendarMonthContext'
import { useCalendarContext } from './CalendarContext'

export type CalendarMonthProps = CoreProps<'div', { offset?: number }>

export const CalendarMonth = forwardRef<'div', CalendarMonthProps>(
	({ offset = 0, ...otherProps }, forwardedRef) => {
		const { highlighted } = useCalendarContext()
		const { year, month } = highlighted.add({ months: offset })

		return (
			<CalendarMonthProvider value={{ year, month }}>
				<freya.div ref={forwardedRef} {...otherProps} />
			</CalendarMonthProvider>
		)
	}
)
