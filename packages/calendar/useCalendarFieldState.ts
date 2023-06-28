import { useCallback, useMemo } from 'react'
import { useControlledState } from '../core/useControlledState'
import {
	CalendarFieldDate,
	type CalendarFieldDateOptions
} from './CalendarFieldDate'

export type UseCalendarFieldStateOptions = {
	value?: Date
	defaultValue?: Date
}

export const useCalendarFieldState = ({
	value: valueProp,
	defaultValue: defaultValueProp
}: UseCalendarFieldStateOptions) => {
	// const [visibleYear, setVisibleYear] = useState(0)
	// const [visibleMonth, setVisibleMonth] = useState(0)

	const value = useMemo(
		() => (valueProp ? CalendarFieldDate.fromDate(valueProp) : undefined),
		[valueProp]
	)

	const defaultValue = useMemo(
		() => CalendarFieldDate.fromDate(defaultValueProp),
		[defaultValueProp]
	)

	const [date, setDate] = useControlledState(defaultValue, value)

	const mutate = useCallback(
		(mutation: CalendarFieldDateOptions) =>
			setDate((prev) => prev.clone(mutation)),
		[setDate]
	)

	return useMemo(
		() => ({
			year: date.year,
			month: date.month,
			day: date.day,
			getDaysInMonth: date.getDaysInMonth,
			asDate: date.asDate,
			isValid: date.isValid,
			isEquals: date.isEquals,
			isAfter: date.isAfter,
			isBefore: date.isBefore,
			setYear: (year: CalendarFieldDateOptions['year']) =>
				mutate({ year }),
			setMonth: (month: CalendarFieldDateOptions['month']) =>
				mutate({ month }),
			setDay: (day: CalendarFieldDateOptions['day']) => mutate({ day })
		}),
		[date, mutate]
	)
}
