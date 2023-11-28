import { useState, useCallback } from 'react'
import { useCalendarHighlighted } from './useCalendarHighlighted'
import { useCalendarSelection } from './useCalendarSelection'
import { useCalendarSystem } from './useCalendarSystem'
import { useCalendarVisible } from './useCalendarVisible'
import { clamp, isBetween, isSameDay } from './calendar-functions'
import type { Date, DateRange, DurationLike } from './calendar-types'

export type CalendarSelect = 'one' | 'many' | 'range'

export type CalendarSelectValue<S extends CalendarSelect> =
	| null
	| (S extends 'range' ? DateRange : S extends 'many' ? Date[] : Date)

export type CalendarValue = CalendarSelectValue<CalendarSelect>

export type UseCalendarOptions<S extends CalendarSelect> = {
	autoFocus?: boolean
	calendar?: string
	defaultValue?: CalendarSelectValue<S>
	disabled?: boolean
	locale?: string
	max?: Date
	min?: Date
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
	locale = navigator.language,
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
		value,
		calendar
	})

	const { visibleRange, visibleMonths, addVisibleRange } = useCalendarVisible(
		{
			highlighted,
			months,
			calendar
		}
	)

	const selection = useCalendarSelection({
		behaviour: selectProp,
		highlighted,
		defaultValue,
		value,
		onChange
	})

	const visibleRangeShift = useCallback(
		(duration: DurationLike) => {
			setHighlighted((prev) => prev.add(duration))
			addVisibleRange(duration)
		},
		[setHighlighted, addVisibleRange]
	)

	const highlight = useCallback(
		(date: Date) => {
			const result = clamp(date, { min, max })
			const visible =
				isSameDay(result, visibleRange[0]) ||
				isSameDay(result, visibleRange[1]) ||
				isBetween(result, ...visibleRange)

			setHighlighted(result)

			if (!visible) {
				addVisibleRange({
					months:
						result.year * 12 +
						result.month -
						(highlighted.year * 12 + highlighted.month)
				})
			}
		},
		[min, max, highlighted, visibleRange, addVisibleRange, setHighlighted]
	)

	return {
		calendar,
		disabled,
		focusWithin,
		focusWithinUpdate: setFocusWithin,
		highlight,
		highlighted,
		locale,
		max,
		min,
		readOnly,
		visibleMonths,
		visibleRange,
		visibleRangeShift,
		...selection
	}
}
