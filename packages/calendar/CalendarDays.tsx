import { useMemo, type ReactNode } from 'react'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDate } from './CalendarDate'

export type CalendarDaysItem = {
	role: 'week' | 'weekday' | 'date' | 'blank'
	date: CalendarDate
}

export type CalendarDaysProps = {
	week?: boolean
	weekday?: boolean
	children: (item: CalendarDaysItem, index: number) => ReactNode
}

export const CalendarDays = ({
	week,
	weekday,
	children
}: CalendarDaysProps) => {
	const { focusedDate } = useCalendarContext()

	const days = useMemo(() => {
		const dates: CalendarDaysItem[] = []
		const max = focusedDate.getLastDateOfMonth().getLastDateOfWeek()
		let date = focusedDate.getFirstDateOfMonth().getFirstDateOfWeek()
		let itrs = 0

		if (weekday) {
			date = date.sub({ day: 7 })
		}

		while (!date.isAfter(max)) {
			if (week && date.getWeekDay() === 1) {
				dates.push({
					role: weekday && itrs === 0 ? 'blank' : 'week',
					date
				})
			}

			dates.push({ role: weekday && itrs < 7 ? 'weekday' : 'date', date })
			date = date.add({ day: 1 })
			itrs = itrs + 1
		}

		return dates
	}, [week, weekday, focusedDate])

	return days.map(children)
}
