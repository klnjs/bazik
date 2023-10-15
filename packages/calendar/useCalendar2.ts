import { useMemo, useState, useCallback } from 'react'
import { useControllableState, isSet, isArray } from '../core'
import { compare, getToday, type CalendarDate } from './CalendarDate'

export type CalendarSelect = 'single' | 'multiple' | 'range'

export type CalendarValue<S extends CalendarSelect> =
	| null
	| (S extends 'range'
			? [CalendarDate, CalendarDate]
			: S extends 'multiple'
			? CalendarDate[]
			: CalendarDate)

export type UseCalendarOptions<S extends CalendarSelect> = {
	autoFocus?: boolean
	defaultValue?: CalendarValue<S>
	disabled?: boolean
	locale?: string
	max?: CalendarDate
	min?: CalendarDate
	readOnly?: boolean
	select?: S
	value?: CalendarValue<S>
	onChange?: (value: CalendarValue<S>) => void
}

export const useCalendar = <S extends CalendarSelect = 'single'>({
	autoFocus,
	defaultValue,
	disabled,
	locale,
	max,
	min,
	readOnly,
	select,
	value,
	onChange
}: UseCalendarOptions<S> = {}) => {
	const [focusWithin, setFocusWithin] = useState(autoFocus)

	const [state, setState] = useControllableState({
		value,
		defaultValue,
		onChange
	})

	const [transient, setTransient] = useState<CalendarDate>()

	const [highlighted, setHighlighted] = useState<CalendarDate>(() => {
		if (isArray(value)) {
			return value[0]
		}

		return value ?? getToday()
	})

	const selection = useMemo(
		() =>
			isSet(transient)
				? ([transient, highlighted].toSorted(
						compare
				  ) as CalendarValue<S>)
				: state,
		[state, transient, highlighted]
	)

	const selectionIsTransient = isSet(transient)

	const setSelection = useCallback(
		(date: CalendarDate) => {
			if (select === 'range') {
				setTransient((prev) => {
					if (isSet(prev)) {
						setState(
							[prev, date].toSorted(compare) as CalendarValue<S>
						)
						return undefined
					}

					return date
				})
			} else if (select === 'multiple') {
				setState((prev) => {
					if (isArray(prev)) {
						const filtered = prev.filter((p) => p.equals(date))

						return filtered.length === 0
							? null
							: filtered.length < prev.length
							? (filtered as CalendarValue<S>)
							: ([...prev, date] as CalendarValue<S>)
					}

					return [date] as CalendarDate[] as CalendarValue<S>
				})
			} else {
				setState(date as CalendarValue<S>)
			}
		},
		[select, setState]
	)

	return {
		disabled,
		focusWithin,
		highlighted,
		locale,
		max,
		min,
		readOnly,
		select,
		selection,
		selectionIsTransient,
		setFocusWithin,
		setHighlighted,
		setSelection
	}
}
