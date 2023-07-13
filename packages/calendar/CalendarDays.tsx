import { useMemo, type ReactNode } from 'react'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDate } from './CalendarDate'

export type CalendarDaysProps = {
	children: (day: CalendarDate, index: number) => ReactNode
}

export const CalendarDays = ({ children }: CalendarDaysProps) => {
	const { state, config } = useCalendarContext()

	const days = useMemo(() => {
		const dates: CalendarDate[] = []
		const max = state.focusedDate
			.getLastDateOfMonth()
			.getLastDateOfWeek(config.locale)

		let date = state.focusedDate
			.getFirstDateOfMonth()
			.getFirstDateOfWeek(config.locale)

		while (!date.isEquals(max)) {
			dates.push(date)
			date = date.add({ day: 1 })
		}

		return dates
	}, [state.focusedDate, config.locale])

	return days.map(children)
}
