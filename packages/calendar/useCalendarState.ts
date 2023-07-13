import { useMemo, useState } from 'react'
import { useControllableState } from '../core/useControllableState'
import { CalendarDate } from './CalendarDate'

export type UseCalendarStateOptions = {
	locale: string
	value?: Date
	valueVisible?: Date
	defaultValue?: Date
	onChange?: (value: Date | undefined) => void
}

export const useCalendarState = ({
	locale,
	value,
	valueVisible = value,
	defaultValue,
	onChange
}: UseCalendarStateOptions) => {
	const [date, setDate] = useControllableState({
		value: value ? CalendarDate.fromDate(value) : undefined,
		defaultValue: CalendarDate.fromDate(defaultValue),
		onChange: (newValue: CalendarDate) => onChange?.(newValue.asDate())
	})

	const [focusedDate, setFocusedDate] = useState(
		valueVisible
			? CalendarDate.fromDate(valueVisible)
			: CalendarDate.fromToday()
	)

	const [focusedSegment, setFocusedSegment] = useState(
		focusedDate.getSegmentByIndex(locale, 0)
	)

	return useMemo(
		() => ({
			date,
			focusedDate,
			focusedSegment,
			setDate,
			setFocusedDate,
			setFocusedSegment
		}),
		[
			date,
			focusedDate,
			focusedSegment,
			setDate,
			setFocusedDate,
			setFocusedSegment
		]
	)
}
