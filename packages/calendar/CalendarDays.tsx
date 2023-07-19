import { useMemo, type ReactNode } from 'react'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDate } from './CalendarDate'

export type CalendarDaysProps = {
	rows?: number
	filter?: (date: CalendarDate) => boolean
	children: (date: CalendarDate, index: number) => ReactNode
}

export const CalendarDays = ({
	rows,
	filter = () => true,
	children
}: CalendarDaysProps) => {
	const { focusedDate } = useCalendarContext()

	const days = useMemo(() => {
		const dates: CalendarDate[] = []
		const limit = rows ? rows * 7 : 1000
		const max = focusedDate.getLastDateOfMonth().getLastDateOfWeek()
		let date = focusedDate.getFirstDateOfMonth().getFirstDateOfWeek()

		while (!date.isSameDay(max) && dates.length < limit) {
			if (filter(date)) {
				dates.push(date)
			}

			date = date.add({ day: 1 })
		}

		return dates
	}, [rows, filter, focusedDate])

	return days.map(children)
}
