import {
	useMemo,
	useState,
	useCallback,
	type Dispatch,
	type SetStateAction
} from 'react'
import type { Temporal } from 'temporal-polyfill'
import { useControllableState, isSet, isArray, isFunction } from '../core'
import { clamp, compare, getToday } from './useCalendarTemporal'

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
	highlighted: Temporal.PlainDate
	locale: string
	months: Temporal.PlainDate[]
	max: Temporal.PlainDate | undefined
	min: Temporal.PlainDate | undefined
	readOnly: boolean
	selection: CalendarSelectValue<S>
	selectionIsTransient: S extends 'range' ? boolean : never
	selectionMode: S
	setMonths: Dispatch<SetStateAction<Temporal.PlainDate[]>>
	setSelection: (date: Temporal.PlainDate) => void
	setFocusWithin: Dispatch<SetStateAction<boolean>>
	setHighlighted: Dispatch<SetStateAction<Temporal.PlainDate>>
}

export const useCalendar = <S extends CalendarSelect = 'one'>({
	autoFocus = false,
	defaultValue = null,
	disabled = false,
	locale = navigator.language,
	max,
	min,
	months: monthsProp = 1,
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

	const [months, setMonths] = useState<Temporal.PlainDate[]>(() =>
		Array.from({ length: monthsProp }, (_, index) =>
			highlighted.with({ day: 1 }).add({ months: index })
		)
	)

	const setHighlightedAndClamp = useCallback(
		(action: SetStateAction<Temporal.PlainDate>) => {
			const result = isFunction(action) ? action(highlighted) : action
			const target = clamp(result, min, max)
			const exists = months.some((month) => month.equals(target))

			setHighlighted(target)
			setMonths((prev) =>
				prev.map((month) =>
					month.add({
						months: exists
							? 0
							: target.year * 12 +
							  target.month -
							  (highlighted.year * 12 + highlighted.month)
					})
				)
			)
		},
		[min, max, months, highlighted]
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

	const setSelectionByMode = useCallback(
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
		highlighted,
		locale,
		max,
		min,
		months,
		readOnly,
		selection: selectionToDisplay,
		selectionIsTransient,
		selectionMode,
		setMonths,
		setSelection: setSelectionByMode,
		setHighlighted: setHighlightedAndClamp,
		setFocusWithin
	} as
		| UseCalendarReturn<'one'>
		| UseCalendarReturn<'many'>
		| UseCalendarReturn<'range'>
}
