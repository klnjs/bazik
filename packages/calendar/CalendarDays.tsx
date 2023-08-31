import { useMemo, type ReactNode } from 'react'
import { useCalendarContext } from './CalendarContext'
import { DateTime } from './CalendarDateTime'

export type CalendarDaysItem = {
	role: 'week' | 'weekday' | 'date' | 'blank'
	date: DateTime
	locale: string
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
		const ref = new DateTime().set({ year, month }).getMidnight()
		const end = ref.getEndOfMonth().getEndOfWeek(locale)
		let date = ref.getStartOfMonth().getStartOfWeek(locale)
		let itrs = 0

		if (weekday) {
			date = date.sub({ day: 7 })
		}

		while (!date.isAfter(end)) {
			if (weeknumber && date.getWeekDay(locale) === 1) {
				dates.push({
					role: weekday && itrs === 0 ? 'blank' : 'week',
					date,
					locale
				})
			}

			dates.push({
				role: weekday && itrs < 7 ? 'weekday' : 'date',
				date,
				locale
			})
			date = date.getTommorow()
			itrs = itrs + 1
		}

		return dates
	}, [locale, year, month, weekday, weeknumber])

	return days.map(children)
}
