import { useMemo, type ReactNode } from 'react'
import { useCalendarContext } from './CalendarContext'
import { CalendarDate } from './CalendarDate'

export type CalendarDaysItem = {
	role: 'week' | 'weekday' | 'date' | 'blank'
	date: CalendarDate
}

export type CalendarDaysProps = {
	weekday?: boolean
	weeknumber?: boolean
	children: (item: CalendarDaysItem, index: number) => ReactNode
}

export const CalendarDays = ({
	weekday,
	weeknumber,
	children
}: CalendarDaysProps) => {
	const { locale, highlighted } = useCalendarContext()

	const year = highlighted.getYear()
	const month = highlighted.getMonth()
	const days = useMemo(() => {
		const dates: CalendarDaysItem[] = []
		const reference = new CalendarDate(locale).set({ year, month })
		const max = reference.getLastDateOfMonth().getLastDateOfWeek()
		let date = reference.getFirstDateOfMonth().getFirstDateOfWeek()
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
	}, [locale, year, month, weekday, weeknumber])

	return days.map(children)
}
