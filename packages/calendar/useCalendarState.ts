import { useMemo, useState, useCallback } from 'react'
import { useControllableState } from '../core/useControllableState'
import { CalendarDate, type CalendarDateSegment } from './CalendarDate'

export type UseCalendarStateOptions = {
	value?: Date
	defaultValue?: Date
	onChange?: (value: Date | undefined) => void
}

export const useCalendarState = ({
	value,
	defaultValue,
	onChange
}: UseCalendarStateOptions) => {
	const [date, setDate] = useControllableState({
		value: value ? CalendarDate.fromDate(value) : undefined,
		defaultValue: CalendarDate.fromDate(defaultValue),
		onChange: (newValue: CalendarDate) => onChange?.(newValue.asDate())
	})

	const [dateVisible, setDateVisible] = useState(
		value ? CalendarDate.fromDate(value) : CalendarDate.fromToday()
	)

	const setDateSegment = useCallback(
		(segment: CalendarDateSegment, newValue: number | undefined) =>
			setDate((prev) => prev.clone({ [segment]: newValue })),
		[setDate]
	)

	return useMemo(
		() => ({
			date,
			dateVisible,
			setDate,
			setDateSegment,
			setDateVisible
		}),
		[date, dateVisible, setDate, setDateSegment, setDateVisible]
	)
}
