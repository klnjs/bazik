import { useMemo, type ReactNode } from 'react'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDate } from './CalendarDate'

export type CalendarDaysProps = {
	rows?: number
	children: (date: CalendarDate, index: number) => ReactNode
}

export const CalendarDays = ({ rows, children }: CalendarDaysProps) => {
	const { focusedDate } = useCalendarContext()

	const days = useMemo(() => {
		const dates: CalendarDate[] = []
		const limit = rows ? rows * 7 : Infinity
		const max = focusedDate.getLastDateOfMonth().getLastDateOfWeek()
		let date = focusedDate.getFirstDateOfMonth().getFirstDateOfWeek()

		while (!date.isAfter(max) && dates.length < limit) {
			dates.push(date)
			date = date.add({ day: 1 })
		}

		return dates
	}, [rows, focusedDate])

	return days.map(children)
}
