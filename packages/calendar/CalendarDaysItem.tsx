import { forwardRef } from '../core'
import type { CalendarDate } from './CalendarDate'
import { CalendarDay } from './CalendarDay'
import { CalendarWeek } from './CalendarWeek'
import { CalendarWeekday } from './CalendarWeekday'

export type CalendarDaysItemRole = 'day' | 'week' | 'weekday' | 'blank'

export type CalendarDaysItemProps = {
	key: string
	role: CalendarDaysItemRole
	date: CalendarDate
}

export const CalendarDaysItem = forwardRef<'div', CalendarDaysItemProps>(
	({ role, date, ...otherProps }, forwardedRef) => {
		switch (role) {
			case 'day':
				return (
					<CalendarDay
						ref={forwardedRef}
						date={date}
						data-role={role}
						{...otherProps}
					/>
				)
			case 'week':
				return (
					<CalendarWeek
						ref={forwardedRef}
						date={date}
						data-role={role}
						{...otherProps}
					/>
				)
			case 'weekday':
				return (
					<CalendarWeekday
						ref={forwardedRef}
						date={date}
						data-role={role}
						{...otherProps}
					/>
				)
			default:
				return (
					<div ref={forwardedRef} data-role="blank" {...otherProps} />
				)
		}
	}
)
