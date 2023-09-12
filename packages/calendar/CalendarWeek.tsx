import { freya, forwardRef, type CoreProps } from '../core'
import { useCalendarContext } from './CalendarContext'
import { getWeekOfYear, type CalendarDate } from './CalendarDate'

export type CalendarWeekProps = CoreProps<'div', { date: CalendarDate }>

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
