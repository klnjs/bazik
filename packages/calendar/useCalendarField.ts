import {
	useRef,
	useState,
	useCallback,
	type Dispatch,
	type SetStateAction
} from 'react'
import { useControllableState, type RangeOptional } from '../core'
import { useCalendarValue, toDate } from './useCalendarValue'
import type { CalendarDate, CalendarDateRange, DateRange } from './CalendarDate'

export type UseCalendarFieldOptions<R extends boolean = false> = {
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

export const useCalendarField = <R extends boolean = false>({
	autoFocus: autoFocusProp = false,
	min,
	max,
	range,
	value: valueProp,
	locale = navigator.language,
	disabled = false,
	defaultValue: defaultValueProp = null,
	onChange: onChangeProp
}: UseCalendarFieldOptions<R>) => {
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
	}) as [
		RangeOptional<CalendarDate>,
		Dispatch<SetStateAction<RangeOptional<CalendarDate>>>
	]

	return {
		min: useCalendarValue(min),
		max: useCalendarValue(max),
		range,
		locale,
		disabled,
		titleId,
		setTitleId,
		autoFocus: autoFocusRef.current,
		setAutoFocus,
		value,
		setValue
	}
}
