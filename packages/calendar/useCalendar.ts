import { useRef, useMemo, useState, useCallback } from 'react'
import { useControllableState, type Range, type Assign } from '../core'
import { CalendarDate, type CalendarDateRange } from './CalendarDate'

type DateRange = Range<Date>

export type UseCalendarOptions = (
	| {
			range?: false
			value?: Date | null
			defaultValue?: Date | null
			onChange?: (value: Date | null) => void
	  }
	| {
			range: true
			value?: DateRange | null
			defaultValue?: DateRange | null
			onChange?: (value: DateRange | null) => void
	  }
) & {
	autoFocus?: boolean
	min?: Date
	max?: Date
	locale?: string
	disabled?: boolean
}

export const useCalendar = ({
	autoFocus: autoFocusProp = false,
	min,
	max,
	range,
	value: valueProp,
	locale = navigator.language,
	disabled = false,
	defaultValue: defaultValueProp = null,
	onChange: onChangeProp
}: UseCalendarOptions) => {
	const [titleId, setTitleId] = useState<string>()

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
				onChangeProp(denormalize(newValue) as Date & Range<Date>)
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

	const selection = useMemo(() => {
		if (transient) {
			// @ts-expect-error available in TS 5.2
			// eslint-disable-next-line
			return [transient, highlighted].toSorted((a, b) =>
				// eslint-disable-next-line
				a.isAfter(b)
			) as CalendarDateRange
		}

		return selected
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

	const sharedProps = {
		locale,
		disabled,
		minDate,
		maxDate,
		titleId,
		setTitleId,
		autoFocus: autoFocusRef.current,
		setAutoFocus,
		transient,
		setTransient,
		highlighted,
		setHighlighted,
		selected: selection,
		setSelected: setSelection
	}

	if (range) {
		return {
			range: true,
			...sharedProps
		} as Assign<
			typeof sharedProps,
			{
				range: true
				selected: CalendarDateRange | null
			}
		>
	}

	return {
		range: false,
		...sharedProps
	} as Assign<
		typeof sharedProps,
		{
			range: false
			selected: CalendarDate | null
		}
	>
}

const normalize = (locale: string, value?: Date | Range<Date> | null) => {
	if (value instanceof Date) {
		return new CalendarDate(locale, value)
	}

	if (Array.isArray(value)) {
		return [
			new CalendarDate(locale, value[0]),
			new CalendarDate(locale, value[1])
		] as CalendarDateRange
	}

	return value
}

const denormalize = (value?: CalendarDate | CalendarDateRange | null) => {
	if (value instanceof CalendarDate) {
		return value.getDate()
	}

	if (Array.isArray(value)) {
		return [value[0].getDate(), value[1].getDate()] as Range<Date>
	}

	return null
}
