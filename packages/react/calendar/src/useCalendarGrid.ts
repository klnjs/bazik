import { useMemo } from 'react'
import {
	isAfter,
	toEndOfWeek,
	toEndOfMonth,
	toStartOfWeek,
	isStartOfWeek,
	toStartOfMonth
} from '@klnjs/temporal'
import type { CalendarCellProps } from './CalendarCell'
import type { PlainYearMonth } from './CalendarTypes'

export type UseCalendarGridOptions = {
	month: PlainYearMonth
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

		let itrs = 0
		let date = toStartOfWeek(toStartOfMonth(ref), locale).subtract({
			days: weekdays ? 7 : 0
		})

		while (!isAfter(date, end)) {
			if (weeks && isStartOfWeek(date, locale)) {
				items.push({
					type: weekdays && itrs === 0 ? 'blank' : 'week',
					date: date
				})
			}

			items.push({
				type: weekdays && itrs < 7 ? 'weekday' : 'day',
				date: date
			})

			itrs = itrs + 1
			date = date.add({ days: 1 })
		}

		return items
	}, [month, locale, weeks, weekdays])
