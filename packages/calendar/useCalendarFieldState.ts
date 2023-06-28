import { useMemo, useState, useCallback } from 'react'
import { useControllableState } from '../core/useControllableState'
import {
	CalendarFieldDate,
	type CalendarFieldDateOptions
} from './CalendarFieldDate'

export type UseCalendarFieldStateOptions = {
	value?: Date
	defaultValue?: Date
	onChange?: (value: Date | undefined) => void
}

export const useCalendarFieldState = ({
	value: valueProp,
	defaultValue: defaultValueProp,
	onChange: onChangeProp
}: UseCalendarFieldStateOptions) => {
	const value = useMemo(
		() => (valueProp ? CalendarFieldDate.fromDate(valueProp) : undefined),
		[valueProp]
	)

	const defaultValue = useMemo(
		() =>
			!valueProp
				? CalendarFieldDate.fromDate(defaultValueProp)
				: undefined,
		[defaultValueProp]
	)

	const onChange = useCallback(
		(value: CalendarFieldDate) => onChangeProp?.(value.asDate()),
		[onChangeProp]
	)

	const [date, setDate] = useControllableState({
		value,
		defaultValue,
		onChange
	})

	const [dateVisible, setDateVisible] = useState(
		value ?? CalendarFieldDate.fromToday()
	)

	const update = useCallback(
		(mutation: CalendarFieldDateOptions) =>
			setDate((prev) => prev.clone(mutation)),
		[setDate]
	)

	return useMemo(
		() => ({
			date: date,
			dateVisible: dateVisible,
			setDate: (date: CalendarFieldDateOptions) => update(date),
			setSegment: (
				segment: 'year' | 'month' | 'day',
				value: number | undefined
			) => update({ [segment]: value }),
			setMonth: (month: CalendarFieldDateOptions['month']) =>
				update({ month }),
			setDay: (day: CalendarFieldDateOptions['day']) => update({ day })
		}),
		[date, update, setDate]
	)
}
