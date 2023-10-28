import { useMemo, useState, useCallback } from 'react'
import type { Temporal } from 'temporal-polyfill'
import { useControllableState, isSet, isArray } from '../core'
import {
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
			? [Temporal.PlainDate, Temporal.PlainDate]
			: S extends 'many'
			? Temporal.PlainDate[]
			: Temporal.PlainDate)

export type CalendarValue = CalendarSelectValue<CalendarSelect>

export type UseCalendarOptions<S extends CalendarSelect> = {
	autoFocus?: boolean
	defaultValue?: CalendarSelectValue<S>
	disabled?: boolean
	locale?: string
	max?: Temporal.PlainDate
	min?: Temporal.PlainDate
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
	highlight: (date: Temporal.PlainDate) => void
	highlighted: Temporal.PlainDate
	locale: string
	max: Temporal.PlainDate | undefined
	min: Temporal.PlainDate | undefined
	readOnly: boolean
	select: (date: Temporal.PlainDate) => void
	selection: CalendarSelectValue<S>
	selectionIsTransient: S extends 'range' ? boolean : never
	selectionMode: S
	selectionToDisplay: CalendarSelectValue<S>
	visibleMonths: number
	visibleRange: [Temporal.PlainDate, Temporal.PlainDate]
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

	const [highlighted, setHighlighted] = useState<Temporal.PlainDate>(() =>
		isArray(value) ? value[0] : value ?? getToday()
	)

	const [transient, setTransient] = useState<Temporal.PlainDate>()

	const [visibleRange, setVisibleRange] = useState<
		[Temporal.PlainDate, Temporal.PlainDate]
	>(() => [
		toStartOfMonth(highlighted),
		toEndOfMonth(highlighted.add({ months: months - 1 }))
	])

	const visibleRangeShift = (
		duration: Temporal.Duration | Temporal.DurationLike
	) => {
		setHighlighted((prev) => prev.add(duration))
		setVisibleRange((prev) => [
			toStartOfMonth(prev[0].add(duration)),
			toEndOfMonth(prev[1].add(duration))
		])
	}

	const highlight = useCallback(
		(date: Temporal.PlainDate) => {
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
		(date: Temporal.PlainDate) => {
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
