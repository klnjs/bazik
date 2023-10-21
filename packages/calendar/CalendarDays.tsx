import { useMemo, type ReactNode } from 'react'
import {
	isAfter,
	getToday,
	toEndOfWeek,
	toEndOfMonth,
	toStartOfWeek,
	isStartOfWeek,
	toStartOfMonth
} from './useCalendarDateUtils'
import { useCalendarContext } from './CalendarContext'
import { useCalendarMonthContext } from './CalendarMonthContext'
import type {
	CalendarDaysItemProps,
	CalendarDaysItemRole
} from './CalendarDaysItem'

export type CalendarDaysProps = {
	week?: boolean
	weekday?: boolean
	children: (item: CalendarDaysItemProps, index: number) => ReactNode
}

export const CalendarDays = ({
	week,
	weekday,
	children
}: CalendarDaysProps) => {
	const { locale } = useCalendarContext()
	const { year, month } = useCalendarMonthContext()

	const days = useMemo(() => {
		const items: CalendarDaysItemProps[] = []
		const ref = getToday().with({ year, month })
		const end = toEndOfWeek(toEndOfMonth(ref), locale)

		let role: CalendarDaysItemRole
		let itrs = 0
		let date = toStartOfWeek(toStartOfMonth(ref), locale).subtract({
			days: weekday ? 7 : 0
		})

		while (!isAfter(date, end)) {
			if (week && isStartOfWeek(date, locale)) {
				role = weekday && itrs === 0 ? 'blank' : 'week'
				items.push({
					key: `${role}-${date.toString()}`,
					role,
					date
				})
			}

			role = weekday && itrs < 7 ? 'weekday' : 'day'
			items.push({
				key: `${role}-${date.toString()}`,
				role,
				date
			})

			date = date.add({ days: 1 })
			itrs = itrs + 1
		}

		return items
	}, [locale, year, month, week, weekday])

	return days.map(children)
}
