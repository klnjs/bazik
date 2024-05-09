import { useMemo } from 'react'
import {
	toEndOfWeek,
	toEndOfMonth,
	toStartOfWeek,
	isStartOfWeek
} from '@klnjs/temporal'
import type { LocaleCalendar } from '@klnjs/locale'
import type { PlainYearMonth } from './CalendarTypes'
import type { CalendarCellProps } from './CalendarCell'

export type UseCalendarGridOptions = {
	calendar: LocaleCalendar
	locale: string
	month: PlainYearMonth
	overflow?: 'auto' | 'align'
	weekdays?: boolean
	weeks?: boolean
}

export const useCalendarGrid = ({
	calendar,
	locale,
	month,
	overflow = 'auto',
	weekdays,
	weeks
}: UseCalendarGridOptions) =>
	useMemo(() => {
		const start = month.toPlainDate({ day: 1 }).withCalendar(calendar)
		const startOf = toStartOfWeek(start, locale)
		const startOfVisible = startOf.subtract({ weeks: weekdays ? 1 : 0 })
		const endOfVisible = toEndOfWeek(toEndOfMonth(start), locale)

		const days = endOfVisible.since(startOfVisible).days + 1
		const daysVisible = overflow === 'auto' ? days : weekdays ? 49 : 42

		return Array.from({ length: daysVisible }).reduce<CalendarCellProps[]>(
			(acc, _, index) => {
				const date = startOfVisible.add({ days: index })
				const type = weekdays && index < 7 ? 'weekday' : 'day'

				if (weeks && isStartOfWeek(date, locale)) {
					acc.push({
						date,
						type: weekdays && index === 0 ? 'blank' : 'week'
					})
				}

				acc.push({ date, type })

				return acc
			},
			[]
		)
	}, [calendar, locale, month, weeks, weekdays, overflow])
