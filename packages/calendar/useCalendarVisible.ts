import { useState, useCallback, useLayoutEffect } from 'react'
import { useIsFirstRender } from '../core/useIsFirstRender'
import { toEndOfMonth, toStartOfMonth } from './calendar-functions'
import type { Date, DateRange, DurationLike } from './calendar-types'

export type UseCalendarVisibleOptions = {
	months: number
	calendar: string
	highlighted: Date
}

export const createVisibleRange = ({
	months,
	calendar,
	highlighted
}: UseCalendarVisibleOptions): DateRange => [
	toStartOfMonth(highlighted.withCalendar(calendar)),
	toEndOfMonth(highlighted.withCalendar(calendar).add({ months: months - 1 }))
]

export const useCalendarVisible = ({
	months,
	calendar,
	highlighted
}: UseCalendarVisibleOptions) => {
	const isFirstRender = useIsFirstRender()

	const [visibleRange, setVisibleRange] = useState(() =>
		createVisibleRange({ months, calendar, highlighted })
	)

	const addVisibleRange = useCallback((duration: DurationLike) => {
		setVisibleRange((prev) => [
			prev[0].add(duration),
			prev[1].add(duration)
		])
	}, [])

	useLayoutEffect(() => {
		if (!isFirstRender) {
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
