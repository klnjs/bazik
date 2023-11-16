import { useState, useCallback, useLayoutEffect } from 'react'
import { useIsFirstRender } from '../core/useIsFirstRender'
import { toEndOfMonth, toStartOfMonth } from './calendar-functions'
import type { Date, DateRange, DurationLike } from './calendar-types'

export type UseCalendarVisibleOptions = {
	highlighted: Date
	months: number
	calendar: string
}

export const createVisibleRange = ({
	highlighted,
	months,
	calendar
}: UseCalendarVisibleOptions): DateRange => [
	toStartOfMonth(highlighted.withCalendar(calendar)),
	toEndOfMonth(highlighted.withCalendar(calendar).add({ months: months - 1 }))
]

export const useCalendarVisible = (options: UseCalendarVisibleOptions) => {
	const isFirstRender = useIsFirstRender()

	const [visibleRange, setVisibleRange] = useState(() =>
		createVisibleRange(options)
	)

	const addVisibleRange = useCallback((duration: DurationLike) => {
		setVisibleRange((prev) => [
			prev[0].add(duration),
			prev[1].add(duration)
		])
	}, [])

	useLayoutEffect(() => {
		if (!isFirstRender) {
			setVisibleRange(createVisibleRange(options))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [options.calendar, options.months])

	return {
		visibleRange,
		visibleMonths: options.months,
		setVisibleRange,
		addVisibleRange
	}
}
