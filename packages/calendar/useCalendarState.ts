import { useMemo, useState } from 'react'
import { useControllableState } from '../core/useControllableState'
import { CalendarDate, type CalendarDateSegment } from './CalendarDate'

export type UseCalendarStateOptions = {
	value?: Date
	valueVisible?: Date
	defaultValue?: Date
	onChange?: (value: Date | undefined) => void
}

export const useCalendarState = ({
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

	const [dateVisible, setDateVisible] = useState(
		valueVisible
			? CalendarDate.fromDate(valueVisible)
			: CalendarDate.fromToday()
	)

	const [dateSegment, setDateSegment] = useState<CalendarDateSegment>('day')

	return useMemo(
		() => ({
			date,
			dateVisible,
			dateSegment,
			setDate,
			setDateVisible,
			setDateSegment
		}),
		[
			date,
			dateSegment,
			dateVisible,
			setDate,
			setDateVisible,
			setDateSegment
		]
	)
}
