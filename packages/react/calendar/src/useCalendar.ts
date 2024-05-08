import { useMemo, useState, useCallback } from 'react'
import { clamp, isAfter, isBefore, isBetweenInclusive } from '@klnjs/temporal'
import type { LocaleCalendar } from '@klnjs/locale'
import { useCalendarHighlighted } from './useCalendarHighlighted'
import {
	useCalendarSelection,
	type CalendarSelect,
	type CalendarSelectValue
} from './useCalendarSelection'
import { useCalendarSystem } from './useCalendarSystem'
import {
	createVisibleRange,
	expandVisibleRange,
	useCalendarVisibleRange
} from './useCalendarVisibleRange'
import type {
	Duration,
	PlainDate,
	PlainDateRange,
	CalendarVisibleDuration
} from './CalendarTypes'
import { Temporal } from 'temporal-polyfill'

export const defaultVisibleDuration = { months: 1 }

export type UseCalendarOptions<S extends CalendarSelect> = {
	autoFocus?: boolean
	calendar?: LocaleCalendar
	defaultValue?: CalendarSelectValue<S>
	disabled?: boolean
	locale?: string
	max?: PlainDate
	min?: PlainDate
	visibleDuration?: CalendarVisibleDuration
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
	visibleDuration: visibleDurationProp = defaultVisibleDuration,
	readOnly = false,
	select: selectProp,
	value,
	onChange
}: UseCalendarOptions<S> = {}) => {
	const visibleDuration = useMemo(
		() => Temporal.Duration.from(visibleDurationProp),
		[visibleDurationProp]
	)

	const [focusWithin, setFocusWithin] = useState(autoFocus)

	const { calendar } = useCalendarSystem({ locale, calendar: calendarProp })

	const { highlighted, setHighlighted } = useCalendarHighlighted({
		date: value,
		calendar
	})

	const { visibleRange, setVisibleRange } = useCalendarVisibleRange({
		date: highlighted,
		duration: visibleDuration
	})

	const selection = useCalendarSelection({
		behaviour: selectProp,
		highlighted,
		defaultValue,
		value,
		onChange
	})

	const updateVisibleRange = useCallback(
		(duration: Duration) =>
			setVisibleRange((vr) => {
				const result: PlainDateRange = expandVisibleRange([
					vr[0].add(duration),
					vr[1].add(duration)
				])

				setHighlighted((h) =>
					isBetweenInclusive(h, result[0], result[1])
						? h
						: clamp(h.add(duration), min, max)
				)

				return result
			}),
		[min, max, setHighlighted, setVisibleRange]
	)

	const updateHighlighted = useCallback(
		(date: PlainDate) => {
			const result = clamp(date, min, max)
			const duration = isBefore(date, visibleRange[0])
				? visibleDuration.abs().negated()
				: isAfter(date, visibleRange[1])
					? visibleDuration.abs()
					: undefined

			setHighlighted(result)

			if (duration) {
				setVisibleRange(
					createVisibleRange({
						date,
						duration
					})
				)
			}
		},
		[
			min,
			max,
			visibleRange,
			visibleDuration,
			setHighlighted,
			setVisibleRange
		]
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
		visibleRange,
		visibleDuration,
		setFocusWithin,
		updateHighlighted,
		updateVisibleRange,
		...selection
	}
}
