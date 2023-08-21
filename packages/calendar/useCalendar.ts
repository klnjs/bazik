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
	min,
	max,
	range,
	value: valueProp,
	locale = navigator.language,
	disabled = false,
	defaultValue: defaultValueProp = null,
	onChange: onChangeProp
}: UseCalendarOptions<R>) => {
	const [titleId, setTitleId] = useState<string>()

	const minDate = useCalendarValue(min)

	const maxDate = useCalendarValue(max)

	const value = useCalendarValue(valueProp)

	const defaultValue = useCalendarValue(defaultValueProp)

	const onChange = useCallback(
		(newValue: typeof value) => {
			if (onChangeProp) {
				onChangeProp(toDate(newValue) as Date & DateRange)
			}
		},
		[onChangeProp]
	)

	const autoFocusRef = useRef(autoFocusProp && !disabled)

	const setAutoFocus = useCallback((autoFocus: boolean) => {
		autoFocusRef.current = autoFocus
	}, [])

	const [selected, setSelected] = useControllableState({
		value,
		defaultValue,
		onChange
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

		return [selected, false]
	}, [selected, transient, highlighted])

	const setSelection = useCallback(
		(date: CalendarDate) => {
			if (!range) {
				setSelected(date)
			} else if (transient !== undefined) {
				// @ts-expect-error available in TS 5.2
				// eslint-disable-next-line
				setSelected([transient, date].toSorted((a, b) => a.isAfter(b)))
				setTransient(undefined)
			} else {
				setTransient(date)
			}
		},
		[range, transient, setSelected]
	)

	return {
		locale,
		disabled,
		minDate,
		maxDate,
		titleId,
		setTitleId,
		autoFocus: autoFocusRef.current,
		setAutoFocus,
		highlighted,
		setHighlighted,
		selectionIsTransient,
		selection,
		setSelection
	}
}
