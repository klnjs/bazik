import { useMemo, type ReactNode } from 'react'
import type { Temporal } from 'temporal-polyfill'
import { useCalendarContext } from './CalendarContext'
import * as fns from './CalendarHelpers'

export type CalendarDaysItem = {
	role: 'week' | 'weekday' | 'date' | 'blank'
	date: Temporal.PlainDate
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
	const { year, month } = highlighted

	const days = useMemo(() => {
		const dates: CalendarDaysItem[] = []
		const ref = fns.getToday().with({ year, month })

		const end = fns.toEndOfWeek(fns.toEndOfMonth(ref), locale)

		let itrs = 0
		let date = fns.toStartOfWeek(fns.toStartOfMonth(ref), locale).subtract({
			days: weekday ? 7 : 0
		})

		while (!fns.isAfter(date, end)) {
			if (weeknumber && fns.isStartOfWeek(date, locale)) {
				dates.push({
					role: weekday && itrs === 0 ? 'blank' : 'week',
					date
				})
			}

			dates.push({
				role: weekday && itrs < 7 ? 'weekday' : 'date',
				date
			})
			date = date.add({ days: 1 })
			itrs = itrs + 1
		}

		return dates
	}, [year, month, locale, weekday, weeknumber])

	return days.map(children)
}
