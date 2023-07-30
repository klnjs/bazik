import { useMemo, type ReactNode } from 'react'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDate } from './CalendarDate'

export type CalendarDaysProps = {
	children: (date: CalendarDate, index: number) => ReactNode
}

export const CalendarDays = ({ children }: CalendarDaysProps) => {
	const { focusedDate } = useCalendarContext()

	const days = useMemo(() => {
		const dates: CalendarDate[] = []
		const max = focusedDate.getLastDateOfMonth().getLastDateOfWeek()
		let date = focusedDate.getFirstDateOfMonth().getFirstDateOfWeek()

		while (!date.isAfter(max)) {
			dates.push(date)
			date = date.add({ day: 1 })
		}

		return dates
	}, [focusedDate])

	return days.map(children)
}
