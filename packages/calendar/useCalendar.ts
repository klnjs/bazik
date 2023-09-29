import {
	useMemo,
	useState,
	useCallback,
	type Dispatch,
	type SetStateAction
} from 'react'
import { useControllableState, isSet, isArray } from '../core'
import { compare, getToday, isEquals, type CalendarDate } from './CalendarDate'

type Config<S, V> = {
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

type Return<S, V> = {
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

export type UseCalendarOptions =
	| Config<'single', CalendarDate>
	| Config<'multiple', CalendarDate[]>
	| Config<'range', [CalendarDate, CalendarDate]>

export type UseCalendarReturn =
	| Return<'single', CalendarDate>
	| Return<'multiple', CalendarDate[]>
	| Return<'range', [CalendarDate, CalendarDate]>

export const useCalendar = ({
	autoFocus = false,
	defaultValue: defaultValueProp = null,
	disabled = false,
	locale = navigator.language,
	max,
	min,
	select,
	readOnly = false,
	value: valueProp,
	onChange: onChangeProp
}: UseCalendarOptions) => {
	const [value, setValue] = useControllableState({
		value: valueProp,
		defaultValue: defaultValueProp,
		onChange: onChangeProp as (
			value:
				| CalendarDate
				| CalendarDate[]
				| [CalendarDate, CalendarDate]
				| null
		) => void
	})

	const [focusWithin, setFocusWithin] = useState(autoFocus)

	const [highlighted, setHighlighted] = useState(() => {
		if (!valueProp) {
			return getToday()
		}

		switch (select) {
			case 'range':
				return valueProp[1]
			case 'multiple':
				return valueProp[0]
			default:
				return valueProp
		}
	})

	const [transient, setTransient] = useState<CalendarDate>()

	const [selection, selectionIsTransient] = useMemo(() => {
		if (select === 'range' && isSet(transient)) {
			return [[transient, highlighted].toSorted(compare), true]
		}

		return [value, false]
	}, [select, value, transient, highlighted])

	const setSelection = useCallback(
		(date: CalendarDate) => {
			setValue((prev) => {
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
		[select, transient, setValue]
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
	} as UseCalendarReturn
}
