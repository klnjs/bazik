import { useMemo } from 'react'
import { useCalendarFieldState } from './useCalendarFieldState'
import { useCalendarFieldSegment } from './useCalendarFieldSegment'
import {
	isDateAfter,
	isDateBefore,
	getDaysInMonth,
	getToday
} from './calendarUtils'

export type UseCalendarFieldOptions = {
	min?: Date
	max?: Date
	value?: Date
	defaultValue?: Date
}

export const useCalendarField = ({
	min,
	max,
	value,
	defaultValue
}: UseCalendarFieldOptions) => {
	const state = useCalendarFieldState({ value, defaultValue })
	const today = getToday()
	const invalid =
		(min !== undefined && isDateBefore(state.date, min)) ||
		(max !== undefined && isDateAfter(state.date, max))

	const yearProps = useCalendarFieldSegment({
		min: 1,
		max: 9999,
		start: today.getFullYear(),
		value: state.yearSegment,
		label: 'Year',
		invalid,
		placeholder: 'yyyy',
		onChange: state.setYearSegment
	})

	const monthProps = useCalendarFieldSegment({
		min: 1,
		max: 12,
		start: today.getMonth() + 1,
		value: state.monthSegment,
		label: 'Month',
		invalid,
		placeholder: 'mm',
		onChange: state.setMonthSegment
	})

	const dayProps = useCalendarFieldSegment({
		min: 1,
		max: state.dateIsValid ? getDaysInMonth(state.date) : 31,
		start: today.getDate(),
		value: state.daySegment,
		label: 'Day',
		invalid,
		placeholder: 'dd',
		onChange: state.setDaySegment
	})

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
