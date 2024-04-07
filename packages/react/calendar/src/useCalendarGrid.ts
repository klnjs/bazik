import { useMemo } from 'react'
import {
	isAfter,
	toEndOfWeek,
	toEndOfMonth,
	toStartOfWeek,
	isStartOfWeek,
	toStartOfMonth
} from './calendar-functions'
import type { CalendarCellProps, CalendarCellRole } from './CalendarCell'
import type { YearMonth } from './calendar-types'

export type UseCalendarGridOptions = {
	month: YearMonth
	locale: string
	weeks?: boolean
	weekdays?: boolean
}

export const useCalendarGrid = ({
	month,
	locale,
	weeks,
	weekdays
}: UseCalendarGridOptions) =>
	useMemo(() => {
		const items: CalendarCellProps[] = []
		const ref = month.toPlainDate({ day: 1 })
		const end = toEndOfWeek(toEndOfMonth(ref), locale)

		let role: CalendarCellRole
		let itrs = 0
		let date = toStartOfWeek(toStartOfMonth(ref), locale).subtract({
			days: weekdays ? 7 : 0
		})

		while (!isAfter(date, end)) {
			if (weeks && isStartOfWeek(date, locale)) {
				role = weekdays && itrs === 0 ? 'blank' : 'week'
				items.push({
					key: `${role}-${date.toString()}`,
					role,
					date: date
				})
			}

			role = weekdays && itrs < 7 ? 'weekday' : 'day'
			items.push({
				key: `${role}-${date.toString()}`,
				role,
				date: date
			})

			itrs = itrs + 1
			date = date.add({ days: 1 })
		}

		return items
	}, [month, locale, weeks, weekdays])
