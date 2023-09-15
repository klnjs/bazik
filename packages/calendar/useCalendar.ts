import {
	useMemo,
	useState,
	useCallback,
	type Dispatch,
	type SetStateAction
} from 'react'
import { useControllableState, isRange, type Assign, isSet } from '../core'
import {
	isAfter,
	getToday,
	type CalendarDate,
	type CalendarDateRange
} from './CalendarDate'

export type UseCalendarOptions<R extends boolean = false> = {
	autoFocus?: boolean
	defaultValue?: (R extends false ? CalendarDate : CalendarDateRange) | null
	disabled?: boolean
	locale?: string
	max?: CalendarDate
	min?: CalendarDate
	range?: R
	readOnly?: boolean
	value?: (R extends false ? CalendarDate : CalendarDateRange) | null
	onChange?: (
		value: (R extends false ? CalendarDate : CalendarDateRange) | null
	) => void
}

export const useCalendar = <R extends boolean = false>({
	autoFocus = false,
	defaultValue: defaultValueProp = null,
	disabled = false,
	locale = navigator.language,
	max,
	min,
	range,
	readOnly = false,
	value: valueProp,
	onChange
}: UseCalendarOptions<R>) => {
	const [value, setValue] = useControllableState({
		value: valueProp,
		defaultValue: defaultValueProp,
		onChange: onChange
	}) as [
		CalendarDate | CalendarDateRange | null,
		Dispatch<SetStateAction<CalendarDate | CalendarDateRange | null>>
	]

	const [focusWithin, setFocusWithin] = useState(autoFocus)

	const [highlighted, setHighlighted] = useState<CalendarDate>(() => {
		if (isRange(valueProp)) {
			return valueProp[1]
		}

		return valueProp ?? getToday()
	})

	const [transient, setTransient] = useState<CalendarDate>()

	const [selection, selectionIsTransient] = useMemo(() => {
		if (isSet(transient)) {
			return [
				// @ts-expect-error available in TS 5.2
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				[transient, highlighted].toSorted(isAfter) as CalendarDateRange,
				true
			]
		}

		return [value, false]
	}, [value, transient, highlighted])

	const setSelection = useCallback(
		(date: CalendarDate) => {
			if (range) {
				if (isSet(transient)) {
					// @ts-expect-error available in TS 5.2
					// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
					setValue([transient, date].toSorted(isAfter))
					setTransient(undefined)
				} else {
					setTransient(date)
				}
			} else {
				setValue(date)
				setTransient(undefined)
			}
		},
		[range, transient, setValue]
	)

	const shared = {
		disabled,
		focusWithin,
		highlighted,
		locale,
		max,
		min,
		range: Boolean(range),
		readOnly,
		selection,
		selectionIsTransient,
		setFocusWithin,
		setHighlighted,
		setSelection
	}

	if (!range) {
		return shared as Assign<
			typeof shared,
			{
				range: false
				selection: CalendarDate | null
			}
		>
	}

	return shared as Assign<
		typeof shared,
		{
			range: true
			selection: CalendarDateRange | null
		}
	>
}
