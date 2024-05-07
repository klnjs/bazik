import { useState } from 'react'
import { useEffectOnUpdate } from '@klnjs/core'
import { compare, toEndOfMonth, toStartOfMonth } from '@klnjs/temporal'
import type { Duration, PlainDate, PlainDateRange } from './CalendarTypes'

export type UseCalendarVisibleOptions = {
	date: PlainDate
	duration: Duration
}

export const expandVisibleRange = (range: PlainDateRange): PlainDateRange => [
	toStartOfMonth(range[0]),
	toEndOfMonth(range[1])
]

export const createVisibleRange = ({
	date,
	duration
}: UseCalendarVisibleOptions): PlainDateRange => {
	const offset =
		duration.sign === 0
			? duration
			: duration.sign === 1
				? duration.subtract({ months: 1 }, { relativeTo: date })
				: duration.add({ months: 1 }, { relativeTo: date })

	const range = [date, date.add(offset)].sort(compare) as PlainDateRange

	return expandVisibleRange(range)
}

export const useCalendarVisibleRange = ({
	date,
	duration
}: UseCalendarVisibleOptions) => {
	const [visibleRange, setVisibleRange] = useState(() =>
		createVisibleRange({ date, duration })
	)

	useEffectOnUpdate(() => {
		setVisibleRange((prev) =>
			createVisibleRange({ date: prev[0], duration })
		)
	}, [duration])

	return {
		visibleRange,
		setVisibleRange
	}
}
