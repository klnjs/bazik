import { useMemo, useState, useCallback, type SetStateAction } from 'react'
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
	const minDate = useMemo(
		() => (min ? new CalendarDate(min) : undefined),
		[min]
	)

	const maxDate = useMemo(
		() => (max ? new CalendarDate(max) : undefined),
		[max]
	)

	const [focusedDate, setFocusedDate] = useState(
		new CalendarDate(defaultFocused ?? value ?? undefined)
	)

	const setFocusedDateClamp = useCallback(
		(action: SetStateAction<CalendarDate>) => {
			setFocusedDate((prev) => {
				const next = typeof action === 'function' ? action(prev) : prev

				return next.clamp(minDate, maxDate)
			})
		},
		[minDate, maxDate]
	)

	const [selectedDate, setSelectedDate] =
		useControllableState<CalendarDate | null>({
			value: value instanceof Date ? new CalendarDate(value) : value,
			defaultValue:
				defaultValue instanceof Date
					? new CalendarDate(defaultValue).clamp(minDate, maxDate)
					: defaultValue,
			onChange: (newValue) => onChange?.(newValue?.getDate() ?? null)
		})

	const setSelectedDateClamp = useCallback(
		(action: SetStateAction<CalendarDate | null>) => {
			setSelectedDate((prev) => {
				const next = typeof action === 'function' ? action(prev) : prev

				return next ? next.clamp(minDate, maxDate) : null
			})
		},
		[minDate, maxDate, setSelectedDate]
	)

	return {
		locale,
		minDate,
		maxDate,
		focusedDate,
		setFocusedDate: setFocusedDateClamp,
		selectedDate,
		setSelectedDate: setSelectedDateClamp
	}
}
