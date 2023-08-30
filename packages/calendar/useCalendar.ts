import { useRef, useMemo, useState, useCallback } from 'react'
import { useControllableState, isRange, type Assign, type Range } from '../core'
import { DateTime, type DateTimeRange } from './CalendarDateTime'

export type DateRange = Range<Date>

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
	const autoFocusRef = useRef(autoFocusProp && !disabled)

	const setAutoFocus = useCallback((autoFocus: boolean) => {
		autoFocusRef.current = autoFocus
	}, [])

	const [titleId, setTitleId] = useState<string>()

	const [value, setValue] = useControllableState({
		value: useValue(valueProp),
		defaultValue: useValue(defaultValueProp),
		onChange: (next) => {
			if (onChangeProp) {
				onChangeProp(unuseValue(next) as Date & DateRange & null)
			}
		}
	})

	const [highlighted, setHighlighted] = useState(
		() => new DateTime(isRange(valueProp) ? valueProp[1] : valueProp)
	)

	const [transient, setTransient] = useState<DateTime>()

	const [selection, selectionIsTransient] = useMemo(() => {
		if (transient) {
			return [
				// @ts-expect-error available in TS 5.2
				// eslint-disable-next-line
				[transient, highlighted].toSorted((a, b) =>
					// eslint-disable-next-line
					a.isAfter(b)
				) as DateTimeRange,
				true
			]
		}

		return [value, false]
	}, [value, transient, highlighted])

	const setSelection = useCallback(
		(date: DateTime) => {
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
		min: useValue(minProp),
		max: useValue(maxProp),
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
				selection: DateTime | null
			}
		>
	}

	return shared as Assign<
		typeof shared,
		{
			range: true
			selection: DateTimeRange | null
		}
	>
}

function useValue(value?: Date): DateTime | undefined
function useValue(value?: DateRange): DateTimeRange | undefined
function useValue(
	value?: Date | DateRange | null
): DateTime | DateTimeRange | null
function useValue(value?: Date | DateRange | null) {
	return useMemo(() => {
		if (value instanceof Date) {
			return new DateTime(value)
		}

		if (isRange(value)) {
			return value.map((v) => new DateTime(v)) as DateTimeRange
		}

		return value
	}, [value])
}

function unuseValue(
	value?: DateTime | DateTimeRange | null
): Date | DateRange | null {
	if (value instanceof DateTime) {
		return value.toDate()
	}

	if (isRange(value)) {
		return value.map((v) => v.toDate()) as DateRange
	}

	return null
}
