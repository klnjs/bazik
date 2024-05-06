import { useMemo } from 'react'
import { forwardRef, asDataProp } from '@klnjs/core'
import { CalendarDay } from './CalendarDay'
import { CalendarBlank } from './CalendarBlank'
import { CalendarWeek } from './CalendarWeek'
import { CalendarWeekday } from './CalendarWeekday'
import type { Date } from './calendar-types'

export type CalendarCellRole = 'day' | 'week' | 'weekday' | 'blank'

export type CalendarCellProps = {
	key: string
	role: CalendarCellRole
	date: Date
}

export const CalendarCell = forwardRef<'div', CalendarCellProps>(
	({ role, date, ...otherProps }, forwardedRef) => {
		const Component = useMemo(() => {
			switch (role) {
				case 'day':
					return CalendarDay
				case 'week':
					return CalendarWeek
				case 'weekday':
					return CalendarWeekday
				default:
					return CalendarBlank
			}
		}, [role])

		return (
			<Component
				ref={forwardedRef}
				date={date}
				data-role={asDataProp(role)}
				{...otherProps}
			/>
		)
	}
)
