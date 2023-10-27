import {
	useMemo,
	useState,
	useCallback,
	type Dispatch,
	type SetStateAction
} from 'react'
import { Temporal } from 'temporal-polyfill'
import { useControllableState, isSet, isArray, isFunction } from '../core'
import {
	clamp,
	compare,
	getToday,
	isBetween,
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
	highlighted: Temporal.PlainDate
	locale: string
	visibleRange: [Temporal.PlainDate, Temporal.PlainDate]
	visibleMonths: number
	max: Temporal.PlainDate | undefined
	min: Temporal.PlainDate | undefined
	readOnly: boolean
	selection: CalendarSelectValue<S>
	selectionToDisplay: CalendarSelectValue<S>
	selectionIsTransient: S extends 'range' ? boolean : never
	selectionMode: S
	setSelection: (date: Temporal.PlainDate) => void
	setHighlighted: Dispatch<SetStateAction<Temporal.PlainDate>>
	setFocusWithin: Dispatch<SetStateAction<boolean>>
	setVisibleRange: Dispatch<
		SetStateAction<[Temporal.PlainDate, Temporal.PlainDate]>
	>
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

	const setHighlightedAndClamp: typeof setHighlighted = useCallback(
		(action) => {
			const result = clamp(
				isFunction(action) ? action(highlighted) : action,
				min,
				max
			)

			const visible =
				result.equals(visibleRange[0]) ||
				result.equals(visibleRange[1]) ||
				isBetween(result, ...visibleRange)

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
		visibleRange,
		visibleMonths: months,
		readOnly,
		selection,
		selectionToDisplay,
		selectionIsTransient,
		selectionMode,
		setSelection: setSelectionByMode,
		setHighlighted: setHighlightedAndClamp,
		setFocusWithin,
		setVisibleRange
	} as
		| UseCalendarReturn<'one'>
		| UseCalendarReturn<'many'>
		| UseCalendarReturn<'range'>
}

const test1 = Temporal.PlainDate.from('2024-02-29')

console.log(test1.add({ months: 1 }))
