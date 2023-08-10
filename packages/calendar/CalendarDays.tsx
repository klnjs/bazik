import { useMemo, type ReactNode } from 'react'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDate } from './CalendarDate'

export type CalendarDaysItem = {
	role: 'week' | 'weekday' | 'date' | 'blank'
	date: CalendarDate
}

export type CalendarDaysProps = {
	weeknumber?: boolean
	weekday?: boolean
	children: (item: CalendarDaysItem, index: number) => ReactNode
}

export const CalendarDays = ({
	weekday,
	weeknumber,
	children
}: CalendarDaysProps) => {
	const { highlighted } = useCalendarContext()

	const days = useMemo(() => {
		const dates: CalendarDaysItem[] = []
		const max = highlighted.getLastDateOfMonth().getLastDateOfWeek()
		let date = highlighted.getFirstDateOfMonth().getFirstDateOfWeek()
		let itrs = 0

		if (weekday) {
			date = date.sub({ day: 7 })
		}

		while (!date.isAfter(max)) {
			if (weeknumber && date.getWeekDay() === 1) {
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
	}, [weekday, weeknumber, highlighted])

	return days.map(children)
}
