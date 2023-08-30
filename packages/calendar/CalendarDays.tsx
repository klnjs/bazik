import { useMemo, type ReactNode } from 'react'
import { useCalendarContext } from './CalendarContext'
import { CalendarDate, type CalendarDateLocale } from './CalendarDate'

export type CalendarDaysItem = {
	role: 'week' | 'weekday' | 'date' | 'blank'
	date: CalendarDate
	locale: CalendarDateLocale
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
		const ref = new CalendarDate().set({ year, month })
		const end = ref.getLastDateOfMonth().getLastDateOfWeek(locale)
		let date = ref.getFirstDateOfMonth().getFirstDateOfWeek(locale)
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
			date = date.add({ day: 1 })
			itrs = itrs + 1
		}

		return dates
	}, [locale, year, month, weekday, weeknumber])

	return days.map(children)
}
