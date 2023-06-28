import { useMemo, useEffect } from 'react'
import { useCalendarFieldState } from './useCalendarFieldState'
import { useCalendarFieldSegment } from './useCalendarFieldSegment'
import { CalendarFieldDate } from './CalendarFieldDate'

export type UseCalendarFieldOptions = {
	min?: Date
	max?: Date
	value?: Date
	defaultValue?: Date
	onChange?: (value: Date | undefined) => void
}

export const useCalendarField = ({
	min: minProp,
	max: maxProp,
	value,
	defaultValue,
	onChange
}: UseCalendarFieldOptions) => {
	const state = useCalendarFieldState({ value, defaultValue })
	const min = CalendarFieldDate.fromDate(minProp)
	const max = CalendarFieldDate.fromDate(maxProp)
	const today = CalendarFieldDate.fromToday()
	const invalid = state.isBefore(min) || state.isAfter(max)

	const yearProps = useCalendarFieldSegment({
		min: 1,
		max: 9999,
		start: today.year,
		value: state.year,
		label: 'Year',
		invalid,
		placeholder: 'yyyy',
		onChange: state.setYear
	})

	const monthProps = useCalendarFieldSegment({
		min: 1,
		max: 12,
		start: today.month,
		value: state.month,
		label: 'Month',
		invalid,
		placeholder: 'mm',
		onChange: state.setMonth
	})

	const dayProps = useCalendarFieldSegment({
		min: 1,
		max: state.getDaysInMonth() ?? 31,
		start: today.day,
		value: state.day,
		label: 'Day',
		invalid,
		placeholder: 'dd',
		onChange: state.setDay
	})

	useEffect(() => {
		if (onChange) {
			onChange(!invalid ? state.asDate() : undefined)
		}
	}, [state, invalid, onChange])

	return useMemo(
		() => ({
			rootProps: { role: 'group' },
			yearProps,
			monthProps,
			dayProps
		}),
		[yearProps, monthProps, dayProps]
	)
}
