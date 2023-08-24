import { useRef, useMemo, useState, useCallback } from 'react'
import { useControllableState, isRange } from '../core'
import { useCalendarValue, toDate } from './useCalendarValue'
import {
	CalendarDate,
	type CalendarDateRange,
	type DateRange
} from './CalendarDate'

export type UseCalendarOptions<R extends boolean = false> = {
	autoFocus?: boolean
	min?: Date
	max?: Date
	locale?: string
	disabled?: boolean
	range?: R
	value?: (R extends false ? Date : DateRange) | null
	defaultValue?: (R extends false ? Date : DateRange) | null
	onChange?: (value: (R extends false ? Date : DateRange) | null) => void
}

export const useCalendar = <R extends boolean = false>({
	autoFocus: autoFocusProp = false,
	min: minProp,
	max: maxProp,
	range,
	value: valueProp,
	locale = navigator.language,
	disabled = false,
	defaultValue: defaultValueProp = null,
	onChange: onChangeProp
}: UseCalendarOptions<R>) => {
	const [titleId, setTitleId] = useState<string>()

	const autoFocusRef = useRef(autoFocusProp && !disabled)

	const setAutoFocus = useCallback((autoFocus: boolean) => {
		autoFocusRef.current = autoFocus
	}, [])

	const [value, setValue] = useControllableState({
		value: useCalendarValue(valueProp),
		defaultValue: useCalendarValue(defaultValueProp),
		onChange: useCallback(
			(newValue: CalendarDate | CalendarDateRange | null) => {
				if (onChangeProp) {
					onChangeProp(toDate(newValue) as Date & DateRange)
				}
			},
			[onChangeProp]
		)
	})

	const [transient, setTransient] = useState<CalendarDate>()

	const [highlighted, setHighlighted] = useState(
		() => new CalendarDate(isRange(valueProp) ? valueProp[1] : valueProp)
	)

	const [selection, selectionIsTransient] = useMemo(() => {
		if (transient) {
			return [
				// @ts-expect-error available in TS 5.2
				// eslint-disable-next-line
				[transient, highlighted].toSorted((a, b) =>
					// eslint-disable-next-line
					a.isAfter(b)
				) as CalendarDateRange,
				true
			]
		}

		return [value, false]
	}, [value, transient, highlighted])

	const setSelection = useCallback(
		(date: CalendarDate) => {
			if (!range) {
				setValue(date)
			} else if (transient !== undefined) {
				// @ts-expect-error available in TS 5.2
				// eslint-disable-next-line
				setValue([transient, date].toSorted((a, b) => a.isAfter(b)))
				setTransient(undefined)
			} else {
				setTransient(date)
			}
		},
		[range, transient, setValue]
	)

	const shared = {
		min: useCalendarValue(minProp),
		max: useCalendarValue(maxProp),
		locale,
		disabled,
		titleId,
		setTitleId,
		autoFocus: autoFocusRef.current,
		setAutoFocus,
		highlighted,
		setHighlighted,
		selectionIsTransient,
		setSelection: setSelection
	}

	if (!range) {
		return {
			...shared,
			range: false,
			selection: selection
		} as typeof shared & { range: false; selection: CalendarDate | null }
	}

	return {
		...shared,
		range: true,
		selection: selection
	} as typeof shared & { range: true; selection: CalendarDateRange | null }
}
