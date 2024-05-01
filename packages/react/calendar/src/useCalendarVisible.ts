import { useState, useCallback, useLayoutEffect } from 'react'
import { useMounted } from '@klnjs/core'
import { toEndOfMonth, toStartOfMonth } from './calendar-functions'
import type { PlainDate, PlainDateRange, DurationLike } from './CalendarTypes'

export type UseCalendarVisibleOptions = {
	months: number
	calendar: string
	highlighted: PlainDate
}

export const createVisibleRange = ({
	months,
	calendar,
	highlighted
}: UseCalendarVisibleOptions): PlainDateRange => [
	toStartOfMonth(highlighted.withCalendar(calendar)),
	toEndOfMonth(highlighted.withCalendar(calendar).add({ months: months - 1 }))
]

export const useCalendarVisible = ({
	months,
	calendar,
	highlighted
}: UseCalendarVisibleOptions) => {
	const isMounted = useMounted()

	const [visibleRange, setVisibleRange] = useState(() =>
		createVisibleRange({ months, calendar, highlighted })
	)

	const addVisibleRange = useCallback((duration: DurationLike) => {
		setVisibleRange((prev) => [
			toStartOfMonth(prev[0].add(duration)),
			toEndOfMonth(prev[1].add(duration))
		])
	}, [])

	useLayoutEffect(() => {
		if (isMounted) {
			setVisibleRange(
				createVisibleRange({ months, calendar, highlighted })
			)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [months, calendar])

	return {
		visibleRange,
		visibleMonths: months,
		setVisibleRange,
		addVisibleRange
	}
}
