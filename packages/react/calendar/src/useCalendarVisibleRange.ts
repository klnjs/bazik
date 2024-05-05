import { useState } from 'react'
import { useEffectOnUpdate } from '@klnjs/core'
import { toEndOfMonth, toStartOfMonth } from '@klnjs/temporal'
import type { PlainDate, PlainDateRange } from './CalendarTypes'

export type UseCalendarVisibleOptions = {
	date: PlainDate
	months: number
}

export const expandVisibleRange = (range: PlainDateRange): PlainDateRange => [
	toStartOfMonth(range[0]),
	toEndOfMonth(range[1])
]

export const createVisibleRange = ({
	date,
	months
}: UseCalendarVisibleOptions): PlainDateRange =>
	expandVisibleRange([date, date.add({ months: months - 1 })])

export const useCalendarVisibleRange = ({
	date,
	months
}: UseCalendarVisibleOptions) => {
	const [visibleRange, setVisibleRange] = useState(() =>
		createVisibleRange({ date, months })
	)

	useEffectOnUpdate(() => {
		setVisibleRange((prev) => createVisibleRange({ date: prev[0], months }))
	}, [months])

	return {
		visibleRange,
		setVisibleRange
	}
}
