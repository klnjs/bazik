import { useState } from 'react'
import { useControllableState } from '../core'
import { CalendarDate } from './CalendarDate'

export type UseCalendarOptions = {
	min?: Date
	max?: Date
	value?: Date | null
	locale?: string
	defaultValue?: Date | null
	defaultFocused?: Date
	onChange?: (value: Date | null) => void
}

export const useCalendar = ({
	min,
	max,
	value,
	locale = navigator.language,
	defaultValue = null,
	defaultFocused,
	onChange
}: UseCalendarOptions) => {
	const [focusedDate, setFocusedDate] = useState(
		new CalendarDate(defaultFocused ?? value ?? undefined)
	)

	const [selectedDate, setSelectedDate] =
		useControllableState<CalendarDate | null>({
			value: value instanceof Date ? new CalendarDate(value) : value,
			defaultValue:
				defaultValue instanceof Date
					? new CalendarDate(defaultValue)
					: defaultValue,
			onChange: (newValue) => onChange?.(newValue?.getDate() ?? null)
		})

	return {
		locale,
		minDate: min ? new CalendarDate(min) : undefined,
		maxDate: max ? new CalendarDate(max) : undefined,
		focusedDate,
		setFocusedDate,
		selectedDate,
		setSelectedDate
	}
}
