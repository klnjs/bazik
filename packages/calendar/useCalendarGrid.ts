import { useMemo } from 'react'
import {
	isAfter,
	getToday,
	toEndOfWeek,
	toEndOfMonth,
	toStartOfWeek,
	isStartOfWeek,
	toStartOfMonth
} from './useCalendarDateUtils'
import type { CalendarCellProps, CalendarCellRole } from './CalendarCell'

export type UseCalendarGridOptions = {
	year: number
	month: number
	locale: string
	weeks?: boolean
	weekdays?: boolean
}

export const useCalendarGrid = ({
	year,
	month,
	locale,
	weeks,
	weekdays
}: UseCalendarGridOptions) =>
	useMemo(() => {
		const items: CalendarCellProps[] = []
		const ref = getToday().with({ year, month })
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
					date
				})
			}

			role = weekdays && itrs < 7 ? 'weekday' : 'day'
			items.push({
				key: `${role}-${date.toString()}`,
				role,
				date
			})

			date = date.add({ days: 1 })
			itrs = itrs + 1
		}

		return items
	}, [locale, year, month, weeks, weekdays])
