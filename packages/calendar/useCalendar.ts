import {
	useRef,
	useMemo,
	useState,
	useCallback,
	type Dispatch,
	type SetStateAction
} from 'react'
import { useControllableState, isRange, type Assign, isSet } from '../core'
import { getToday, isAfter } from './CalendarHelpers'
import type { CalendarDate, CalendarDateRange } from './CalendarDate'

export type UseCalendarOptions<R extends boolean = false> = {
	autoFocus?: boolean
	min?: CalendarDate
	max?: CalendarDate
	locale?: string
	disabled?: boolean
	range?: R
	value?: (R extends false ? CalendarDate : CalendarDateRange) | null
	defaultValue?: (R extends false ? CalendarDate : CalendarDateRange) | null
	onChange?: (
		value: (R extends false ? CalendarDate : CalendarDateRange) | null
	) => void
}

export const useCalendar = <R extends boolean = false>({
	autoFocus: autoFocusProp = false,
	min,
	max,
	range,
	value: valueProp,
	locale = navigator.language,
	disabled = false,
	defaultValue: defaultValueProp = null,
	onChange
}: UseCalendarOptions<R>) => {
	const autoFocusRef = useRef(autoFocusProp && !disabled)

	const setAutoFocus = useCallback((autoFocus: boolean) => {
		autoFocusRef.current = autoFocus
	}, [])

	const [value, setValue] = useControllableState({
		value: valueProp,
		defaultValue: defaultValueProp,
		onChange: onChange
	}) as [
		CalendarDate | CalendarDateRange | null,
		Dispatch<SetStateAction<CalendarDate | CalendarDateRange | null>>
	]

	const [titleId, setTitleId] = useState<string>()

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
					setValue([transient, date].toSorted())
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
		min,
		max,
		range: Boolean(range),
		locale,
		disabled,
		titleId,
		setTitleId,
		autoFocus: autoFocusRef.current,
		setAutoFocus,
		highlighted,
		setHighlighted,
		selectionIsTransient,
		selection,
		setSelection: setSelection
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
