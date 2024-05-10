import { useMemo } from 'react'
import { plainDate } from '@klnjs/temporal'
import type { PlainYearMonth } from './CalendarTypes'
import type { CalendarCellProps } from './CalendarCell'

export type UseCalendarGridOptions = {
	locale: string
	month: PlainYearMonth
	overflow?: 'auto' | 'align'
	weekdays?: boolean
	weeks?: boolean
}

export const useCalendarGrid = ({
	locale,
	month,
	overflow = 'auto',
	weekdays,
	weeks
}: UseCalendarGridOptions) =>
	useMemo(() => {
		const start = month.toPlainDate({ day: 1 })
		const startOf = plainDate.toStartOfWeek(start, locale)
		const startOfVisible = startOf.subtract({ weeks: weekdays ? 1 : 0 })
		const endOfVisible = plainDate.toEndOfWeek(
			plainDate.toEndOfMonth(start),
			locale
		)

		const days = endOfVisible.since(startOfVisible).days + 1
		const daysVisible = overflow === 'auto' ? days : weekdays ? 49 : 42

		return Array.from({ length: daysVisible }).reduce<CalendarCellProps[]>(
			(acc, _, index) => {
				const date = startOfVisible.add({ days: index })
				const type = weekdays && index < 7 ? 'weekday' : 'day'

				if (weeks && plainDate.isStartOfWeek(date, locale)) {
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
	}, [locale, month, weeks, weekdays, overflow])
