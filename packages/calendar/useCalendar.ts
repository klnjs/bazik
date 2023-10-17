import {
	useMemo,
	useState,
	useCallback,
	type SetStateAction,
	type Dispatch
} from 'react'
import { useControllableState, isSet, isArray } from '../core'
import { compare, getToday, type CalendarDate } from './CalendarDate'

export type CalendarSelect = 'one' | 'many' | 'range'

export type CalendarSelectValue<S extends CalendarSelect> =
	| null
	| (S extends 'range'
			? [CalendarDate, CalendarDate]
			: S extends 'many'
			? CalendarDate[]
			: CalendarDate)

export type CalendarValue = CalendarSelectValue<CalendarSelect>

export type UseCalendarOptions<S extends CalendarSelect> = {
	autoFocus?: boolean
	defaultValue?: CalendarSelectValue<S>
	disabled?: boolean
	locale?: string
	max?: CalendarDate
	min?: CalendarDate
	readOnly?: boolean
	select?: S
	value?: CalendarSelectValue<S>
	onChange?: (value: CalendarSelectValue<S>) => void
}

export type UseCalendarReturn<S extends CalendarSelect> = {
	disabled: boolean
	focusWithin: boolean
	highlighted: CalendarDate
	locale: string
	max: CalendarDate | undefined
	min: CalendarDate | undefined
	readOnly: boolean
	selection: CalendarSelectValue<S>
	selectionIsTransient: S extends 'range' ? boolean : never
	selectionMode: S
	setFocusWithin: Dispatch<SetStateAction<boolean>>
	setHighlighted: Dispatch<SetStateAction<CalendarDate>>
	setSelection: (date: CalendarDate) => void
}

export const useCalendar = <S extends CalendarSelect = 'one'>({
	autoFocus = false,
	defaultValue = null,
	disabled = false,
	locale = navigator.language,
	max,
	min,
	readOnly = false,
	select: selectionMode,
	value,
	onChange
}: UseCalendarOptions<S> = {}) => {
	const [focusWithin, setFocusWithin] = useState(autoFocus)

	const [state, setState] = useControllableState<CalendarValue>({
		value,
		defaultValue,
		onChange: onChange as (value: CalendarValue) => void
	})

	const [transient, setTransient] = useState<CalendarDate>()

	const [highlighted, setHighlighted] = useState<CalendarDate>(() =>
		isArray(value) ? value[0] : value ?? getToday()
	)

	const selection = useMemo(
		() =>
			isSet(transient)
				? [transient, highlighted].toSorted(compare)
				: state,
		[state, transient, highlighted]
	)

	const selectionIsTransient = isSet(transient)

	const setSelection = useCallback(
		(date: CalendarDate) => {
			if (selectionMode === 'one') {
				setState(date)
			}

			if (selectionMode === 'range') {
				setTransient((prev) => {
					if (isSet(prev)) {
						setState([prev, date].toSorted(compare))
						return undefined
					}

					return date
				})
			}

			if (selectionMode === 'many') {
				setState((prev) => {
					if (isArray(prev)) {
						const filtered = prev.filter((p) => p.equals(date))

						return filtered.length === 0
							? null
							: filtered.length < prev.length
							? filtered
							: [...prev, date]
					}

					return [date]
				})
			}
		},
		[selectionMode, setState]
	)

	return {
		disabled,
		focusWithin,
		highlighted,
		locale,
		max,
		min,
		readOnly,
		selection,
		selectionIsTransient,
		selectionMode,
		setSelection,
		setHighlighted,
		setFocusWithin
	} as
		| UseCalendarReturn<'one'>
		| UseCalendarReturn<'many'>
		| UseCalendarReturn<'range'>
}
