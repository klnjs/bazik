import {
	useMemo,
	useState,
	useCallback,
	type Dispatch,
	type SetStateAction
} from 'react'
import { useControllableState, isSet, isArray } from '../core'
import { compare, getToday, isEquals, type CalendarDate } from './CalendarDate'

type CalendarOptions<S, V> = {
	autoFocus?: boolean
	disabled?: boolean
	locale?: string
	max?: CalendarDate
	min?: CalendarDate
	readOnly?: boolean
	select: S
	value?: V | null
	defaultValue?: V | null
	onChange?: (value: V | null) => void
}

export type CalendarSelect = UseCalendarOptions['select']

export type UseCalendarOptions =
	| CalendarOptions<'single', CalendarDate>
	| CalendarOptions<'multiple', CalendarDate[]>
	| CalendarOptions<'range', [CalendarDate, CalendarDate]>

export type UseCalendarResult =
	| CalendarReturn<'single', CalendarDate>
	| CalendarReturn<'multiple', CalendarDate[]>
	| CalendarReturn<'range', [CalendarDate, CalendarDate]>

type CalendarReturn<S, V> = {
	disabled: boolean
	focusWithin: boolean
	highlighted: CalendarDate
	locale: string
	max: CalendarDate | undefined
	min: CalendarDate | undefined
	readOnly: boolean
	select: S
	selection: V | null
	selectionIsTransient: boolean
	setFocusWithin: Dispatch<SetStateAction<boolean>>
	setHighlighted: Dispatch<SetStateAction<CalendarDate>>
	setSelection: (CalendarDate: CalendarDate) => void
}

export const useCalendar = ({
	autoFocus = false,
	defaultValue = null,
	disabled = false,
	locale = navigator.language,
	max,
	min,
	select,
	readOnly = false,
	value,
	onChange
}: UseCalendarOptions) => {
	const [focusWithin, setFocusWithin] = useState(autoFocus)

	const [highlighted, setHighlighted] = useState(() => {
		if (!value) {
			return getToday()
		}

		switch (select) {
			case 'range':
				return value[1]
			case 'multiple':
				return value[0]
			default:
				return value
		}
	})

	const [transient, setTransient] = useState<CalendarDate>()

	const [selection, setSelectionRaw] = useControllableState({
		value,
		defaultValue,
		onChange: onChange as (value: typeof defaultValue) => void
	})

	const selectionToDisplay = useMemo(() => {
		if (select === 'range' && isSet(transient)) {
			return [transient, highlighted].toSorted(compare)
		}

		return selection
	}, [select, transient, selection, highlighted])

	const selectionIsTransient = isSet(transient)

	const setSelection = useCallback(
		(date: CalendarDate) => {
			setSelectionRaw((prev) => {
				switch (select) {
					case 'multiple': {
						if (isArray(prev)) {
							const filtered = prev.filter(
								(p) => !isEquals(p, date)
							)

							if (filtered.length === 0) {
								return null
							}

							if (filtered.length < prev.length) {
								return filtered
							}

							return [...prev, date]
						}

						return [date]
					}
					case 'range': {
						if (isSet(transient)) {
							setTransient(undefined)

							return [transient, date].toSorted(compare)
						}

						setTransient(date)
						return prev
					}
					default:
						return date
				}
			})
		},
		[select, transient, setSelectionRaw]
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
		selection: selectionToDisplay,
		selectionIsTransient,
		setFocusWithin,
		setHighlighted,
		setSelection
	} as UseCalendarResult
}
