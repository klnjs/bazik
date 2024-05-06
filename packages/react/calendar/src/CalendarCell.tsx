import { useMemo } from 'react'
import { forwardRef } from '@klnjs/core'
import { CalendarCellBlank } from './CalendarCellBlank'
import { CalendarCellDay } from './CalendarCellDay'
import { CalendarCellWeek } from './CalendarCellWeek'
import { CalendarCellWeekday } from './CalendarCellWeekday'
import type { PlainDate } from './CalendarTypes'
import { isDefined } from '@klnjs/assertion'

export type CalendarCellType = 'day' | 'week' | 'weekday' | 'blank'

export type CalendarCellProps = {
	type: CalendarCellType
	date: PlainDate
}

export const isCalendarCell = (
	element: HTMLElement | null,
	type: CalendarCellType
) => {
	if (!element || typeof window === 'undefined') {
		return false
	}

	return isDefined(element.dataset[type])
}

export const CalendarCell = forwardRef<'div', CalendarCellProps>(
	({ type, date, ...otherProps }, forwardedRef) => {
		const Component = useMemo(() => {
			switch (type) {
				case 'day':
					return CalendarCellDay
				case 'week':
					return CalendarCellWeek
				case 'weekday':
					return CalendarCellWeekday
				default:
					return CalendarCellBlank
			}
		}, [type])

		return (
			<Component
				ref={forwardedRef}
				type={type}
				date={date}
				{...otherProps}
			/>
		)
	}
)
