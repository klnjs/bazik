import { useState, useCallback } from 'react'
import { clamp, isBetweenInclusive } from '@klnjs/temporal'
import type { LocaleCalendar } from '@klnjs/locale'
import { useCalendarHighlighted } from './useCalendarHighlighted'
import {
	useCalendarSelection,
	type CalendarSelect,
	type CalendarSelectValue
} from './useCalendarSelection'
import { useCalendarSystem } from './useCalendarSystem'
import {
	expandVisibleRange,
	useCalendarVisibleRange
} from './useCalendarVisibleRange'
import type { PlainDate, DurationLike, PlainDateRange } from './CalendarTypes'

export type UseCalendarOptions<S extends CalendarSelect> = {
	autoFocus?: boolean
	calendar?: LocaleCalendar
	defaultValue?: CalendarSelectValue<S>
	disabled?: boolean
	locale?: string
	max?: PlainDate
	min?: PlainDate
	months?: number
	readOnly?: boolean
	select?: S
	value?: CalendarSelectValue<S>
	onChange?: (value: CalendarSelectValue<S>) => void
}

export const useCalendar = <S extends CalendarSelect = 'one'>({
	autoFocus = false,
	calendar: calendarProp,
	defaultValue = null,
	disabled = false,
	locale = 'en',
	max,
	min,
	months = 1,
	readOnly = false,
	select: selectProp,
	value,
	onChange
}: UseCalendarOptions<S> = {}) => {
	const [focusWithin, setFocusWithin] = useState(autoFocus)

	const { calendar } = useCalendarSystem({ locale, calendar: calendarProp })

	const { highlighted, setHighlighted } = useCalendarHighlighted({
		date: value,
		calendar
	})

	const { visibleRange, setVisibleRange } = useCalendarVisibleRange({
		date: highlighted,
		months
	})

	const selection = useCalendarSelection({
		behaviour: selectProp,
		highlighted,
		defaultValue,
		value,
		onChange
	})

	const updateVisibleRange = useCallback(
		(duration: DurationLike) =>
			setVisibleRange((vr) => {
				const result: PlainDateRange = expandVisibleRange([
					vr[0].add(duration),
					vr[1].add(duration)
				])

				setHighlighted((h) =>
					isBetweenInclusive(h, result[0], result[1])
						? h
						: clamp(h.add(duration), { min, max })
				)

				return result
			}),
		[min, max, setHighlighted, setVisibleRange]
	)

	const updateHighlighted = useCallback(
		(date: PlainDate) =>
			setHighlighted((h) => {
				const result = clamp(date, { min, max })
				const resultMonthsDelta =
					result.year * 12 + result.month - (h.year * 12 + h.month)

				setVisibleRange((vr) =>
					isBetweenInclusive(result, vr[0], vr[1])
						? vr
						: expandVisibleRange([
								vr[0].add({ months: resultMonthsDelta }),
								vr[1].add({ months: resultMonthsDelta })
							])
				)

				return result
			}),
		[min, max, months, setHighlighted, setVisibleRange]
	)

	return {
		calendar,
		disabled,
		focusWithin,
		highlighted,
		locale,
		max,
		min,
		readOnly,
		visibleMonths: months,
		visibleRange,
		setFocusWithin,
		updateHighlighted,
		updateVisibleRange,
		...selection
	}
}
