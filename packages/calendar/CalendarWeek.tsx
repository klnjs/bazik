import { freya, forwardRef, type CoreProps } from '../core'
import { useCalendarContext } from './CalendarContext'
import { getWeekOfYear } from './useCalendarDateUtils'
import type { PlainDate } from './CalendarTypes'

export type CalendarWeekProps = CoreProps<'div', { date: PlainDate }>

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
