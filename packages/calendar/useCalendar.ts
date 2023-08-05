import {
	useRef,
	useMemo,
	useState,
	useCallback,
	type SetStateAction
} from 'react'
import { useControllableState, type Range } from '../core'
import { CalendarDate, type CalendarDateRange } from './CalendarDate'

export type UseCalendarOptions = (
	| {
			range?: false
			value?: Date | null
			defaultValue?: Date | null
			onChange?: (value: Date | null) => void
	  }
	| {
			range: true
			value?: Range<Date> | null
			defaultValue?: Range<Date> | null
			onChange?: (value: Range<Date> | null) => void
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

	const [transient, setTransient] = useState<CalendarDate>()

	const [selection, setSelection] = useControllableState({
		value,
		defaultValue,
		onChange
	})

	const setSelectionTransient = (date: CalendarDate) => {
		if (!range) {
			setSelection(date)
		}

		if (transient !== undefined) {
			setSelection(transient)
			setTransient(undefined)
		} else {
			setTransient(date)
		}
	}

	const autoFocusRef = useRef(autoFocusProp && !disabled)

	const setAutoFocus = useCallback((autoFocus: boolean) => {
		autoFocusRef.current = autoFocus
	}, [])

	const [highlight, setHighlight] = useState(
		() =>
			new CalendarDate(
				locale,
				Array.isArray(valueProp) ? valueProp[0] : valueProp
			)
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
		highlight,
		setHighlight,
		transient,
		setTransient,
		selection,
		setSelection: setSelectionTransient
	}
}

const normalize = (locale: string, value?: Date | Range<Date> | null) => {
	if (value instanceof Date) {
		return new CalendarDate(locale, value)
	}

	if (Array.isArray(value)) {
		return [
			new CalendarDate(locale, value[0]),
			new CalendarDate(locale, value[1])
		] as [CalendarDate, CalendarDate]
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
