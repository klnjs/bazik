import { useMemo, type ReactNode } from 'react'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDate } from './CalendarDate'

export type CalendarDaysProps = {
	rows?: number
	exclude?: (date: CalendarDate) => boolean
	children: (date: CalendarDate, index: number) => ReactNode
}

export const CalendarDays = ({
	rows,
	exclude,
	children
}: CalendarDaysProps) => {
	const { focusedDate } = useCalendarContext()

	const days = useMemo(() => {
		const dates: CalendarDate[] = []
		const limit = rows ? rows * 7 : Infinity
		const max = focusedDate.getLastDateOfMonth().getLastDateOfWeek()
		let date = focusedDate.getFirstDateOfMonth().getFirstDateOfWeek()

		while (!date.isAfter(max) && dates.length < limit) {
			if (exclude === undefined || exclude(date)) {
				dates.push(date)
			}

			date = date.add({ day: 1 })
		}

		return dates
	}, [rows, exclude, focusedDate])

	return days.map(children)
}
