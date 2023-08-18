import { useRef, useMemo, useState, useCallback } from 'react'
import { useControllableState, type Range } from '../core'
import { CalendarDate, type CalendarDateRange } from './CalendarDate'

type DateRange = Range<Date>

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

	const titleRef = useRef<HTMLHeadingElement>()

	const minDate = useMemo(
		() => (min ? new CalendarDate(locale, min) : undefined),
		[locale, min]
	)

	const maxDate = useMemo(
		() => (max ? new CalendarDate(locale, max) : undefined),
		[locale, max]
	)

	const value = useMemo(
		() => normalize(locale, valueProp),
		[locale, valueProp]
	)

	const defaultValue = useMemo(
		() => normalize(locale, defaultValueProp),
		[locale, defaultValueProp]
	)

	const onChange = useCallback(
		(newValue: typeof value) => {
			if (onChangeProp) {
				onChangeProp(denormalize(newValue) as Date & DateRange)
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
		() =>
			new CalendarDate(
				locale,
				Array.isArray(valueProp) ? valueProp[0] : valueProp
			)
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
		titleRef,
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

const normalize = (locale: string, value?: Date | DateRange | null) => {
	if (value instanceof Date) {
		return new CalendarDate(locale, value)
	}

	if (Array.isArray(value)) {
		return value.map(
			(v) => new CalendarDate(locale, v)
		) as CalendarDateRange
	}

	return value
}

const denormalize = (value?: CalendarDate | CalendarDateRange | null) => {
	if (Array.isArray(value)) {
		return value.map((v) => v.toDate()) as DateRange
	}

	return value?.toDate() ?? null
}
