import { useMemo, type ReactNode } from 'react'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDate } from './CalendarDate'

export type CalendarDaysProps = {
	children: (day: CalendarDate, index: number) => ReactNode
}

export const CalendarDays = ({ children }: CalendarDaysProps) => {
	const {
		state,
		config: { locale }
	} = useCalendarContext()

	const days = useMemo(() => {
		const dates: CalendarDate[] = []

		const max = state.focusedDate
			.getLastDateOfMonth()
			.getLastDateOfWeek(locale)

		let date = state.focusedDate
			.getFirstDateOfMonth()
			.getFirstDateOfWeek(locale)

		while (!date.isEquals(max)) {
			dates.push(date)
			date = date.add({ day: 1 })
		}

		return dates
	}, [state.focusedDate, locale])

	return days.map(children)
}
