import { useMemo, useState, useCallback } from 'react'
import type { Temporal } from 'temporal-polyfill'
import { useControllableState, isSet, isArray } from '../core'
import type { PlainDate, PlainDateArray, PlainDateRange } from './CalendarTypes'
import {
	range,
	clamp,
	compare,
	getToday,
	isBetweenInclusive,
	toEndOfMonth,
	toStartOfMonth
} from './useCalendarDateUtils'

export type CalendarSelect = 'one' | 'many' | 'range'

export type CalendarSelectValue<S extends CalendarSelect> =
	| null
	| (S extends 'range'
			? PlainDateRange
			: S extends 'many'
			? PlainDateArray
			: PlainDate)

export type CalendarValue = CalendarSelectValue<CalendarSelect>

export type UseCalendarOptions<S extends CalendarSelect> = {
	autoFocus?: boolean
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

export type UseCalendarReturn<S extends CalendarSelect> = {
	disabled: boolean
	focusWithin: boolean
	focusWithinUpdate: (isFocusWithin: boolean) => void
	highlight: (date: PlainDate) => void
	highlighted: PlainDate
	locale: string
	max: PlainDate | undefined
	min: PlainDate | undefined
	readOnly: boolean
	select: (date: PlainDate) => void
	selection: CalendarSelectValue<S>
	selectionIsTransient: S extends 'range' ? boolean : never
	selectionMode: S
	selectionToDisplay: CalendarSelectValue<S>
	visibleMonths: number
	visibleRange: PlainDateRange
	visibleRangeShift: (duration: Temporal.DurationLike) => void
}

export const useCalendar = <S extends CalendarSelect = 'one'>({
	autoFocus = false,
	defaultValue = null,
	disabled = false,
	locale = navigator.language,
	max,
	min,
	months = 1,
	readOnly = false,
	select: selectionMode,
	value,
	onChange
}: UseCalendarOptions<S> = {}) => {
	const [focusWithin, setFocusWithin] = useState(autoFocus)

	const [highlighted, setHighlighted] = useState<PlainDate>(() =>
		isArray(value) ? value[0] : value ?? getToday()
	)

	const [transient, setTransient] = useState<PlainDate>()

	const [visibleRange, setVisibleRange] = useState<PlainDateRange>(() =>
		range(highlighted, highlighted.add({ months: months - 1 }))
	)

	const visibleRangeShift = (
		duration: Temporal.Duration | Temporal.DurationLike
	) => {
		setHighlighted((prev) => prev.add(duration))
		setVisibleRange((prev) =>
			range(...(prev.map((p) => p.add(duration)) as PlainDateRange))
		)
	}

	const highlight = useCallback(
		(date: PlainDate) => {
			const result = clamp(date, min, max)
			const visible = isBetweenInclusive(result, ...visibleRange)
			const delta =
				result.year * 12 +
				result.month -
				(highlighted.year * 12 + highlighted.month)

			setHighlighted(result)
			setVisibleRange((prev) =>
				visible
					? prev
					: [
							toStartOfMonth(prev[0].add({ months: delta })),
							toEndOfMonth(prev[1].add({ months: delta }))
					  ]
			)
		},
		[min, max, highlighted, visibleRange]
	)

	const [selection, setSelection] = useControllableState<CalendarValue>({
		value,
		defaultValue,
		onChange: onChange as (value: CalendarValue) => void
	})

	const selectionToDisplay = useMemo(
		() =>
			selectionMode === 'range' && isSet(transient)
				? [transient, highlighted].toSorted(compare)
				: selection,
		[selectionMode, selection, transient, highlighted]
	)

	const selectionIsTransient = isSet(transient)

	const select = useCallback(
		(date: PlainDate) => {
			if (selectionMode === 'one') {
				setSelection(date)
			}

			if (selectionMode === 'many') {
				setSelection((prev) => {
					if (isArray(prev)) {
						const filtered = prev.filter((p) => !p.equals(date))

						return filtered.length === 0
							? null
							: filtered.length < prev.length
							? filtered
							: [...prev, date]
					}

					return [date]
				})
			}

			if (selectionMode === 'range') {
				setTransient((prev) => {
					if (isSet(prev)) {
						setSelection([prev, date].toSorted(compare))
						return undefined
					}

					return date
				})
			}
		},
		[selectionMode, setSelection]
	)

	return {
		disabled,
		focusWithin,
		focusWithinUpdate: setFocusWithin,
		highlight,
		highlighted,
		locale,
		max,
		min,
		readOnly,
		select,
		selection,
		selectionIsTransient,
		selectionMode,
		selectionToDisplay,
		visibleMonths: months,
		visibleRange,
		visibleRangeShift
	} as
		| UseCalendarReturn<'one'>
		| UseCalendarReturn<'many'>
		| UseCalendarReturn<'range'>
}
