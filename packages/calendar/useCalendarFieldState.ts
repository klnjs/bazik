import { useMemo, useState, useCallback } from 'react'
import { useControllableState } from '../core/useControllableState'
import {
	CalendarFieldDate,
	type CalendarFieldDateSegment
} from './CalendarFieldDate'

export type UseCalendarFieldStateOptions = {
	value?: Date
	defaultValue?: Date
	onChange?: (value: Date | undefined) => void
}

export const useCalendarFieldState = ({
	value,
	defaultValue,
	onChange
}: UseCalendarFieldStateOptions) => {
	const [date, setDate] = useControllableState({
		value: value ? CalendarFieldDate.fromDate(value) : undefined,
		defaultValue: CalendarFieldDate.fromDate(defaultValue),
		onChange: (newValue: CalendarFieldDate) => onChange?.(newValue.asDate())
	})

	const [dateVisible, setDateVisible] = useState(
		value
			? CalendarFieldDate.fromDate(value)
			: CalendarFieldDate.fromToday()
	)

	const update = useCallback(
		(newDate: CalendarFieldDate) => setDate(newDate),
		[setDate]
	)

	const updateSegment = useCallback(
		(segment: CalendarFieldDateSegment, newValue: number | undefined) =>
			setDate((prev) => prev.clone({ [segment]: newValue })),
		[setDate]
	)

	return useMemo(
		() => ({
			date: date,
			dateVisible: dateVisible,
			setDate: update,
			setSegment: updateSegment
		}),
		[date, dateVisible, update, updateSegment]
	)
}
