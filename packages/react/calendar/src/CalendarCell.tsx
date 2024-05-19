import { isDefined } from '@klnjs/assertion'
import { CalendarCellBlank } from './CalendarCellBlank'
import { CalendarCellDay } from './CalendarCellDay'
import { CalendarCellWeek } from './CalendarCellWeek'
import { CalendarCellWeekday } from './CalendarCellWeekday'
import type { PlainDate } from './CalendarTypes'

export type CalendarCellType = 'day' | 'week' | 'weekday' | 'blank'

export type CalendarCellProps = {
	type: CalendarCellType
	date: PlainDate
}

export const isCalendarCell = (
	element: HTMLElement | null,
	type?: CalendarCellType
) => {
	if (!element || typeof window === 'undefined') {
		return false
	}

	if (!type) {
		return isDefined(element.dataset.cell)
	}

	return element.dataset.cell === type
}

export const CalendarCell = ({
	type,
	date,
	...otherProps
}: CalendarCellProps) => {
	const Component =
		type === 'day'
			? CalendarCellDay
			: type === 'week'
				? CalendarCellWeek
				: type === 'weekday'
					? CalendarCellWeekday
					: CalendarCellBlank

	return <Component type={type} date={date} {...otherProps} />
}
