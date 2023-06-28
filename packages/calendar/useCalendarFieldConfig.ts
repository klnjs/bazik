import { useMemo } from 'react'
import { CalendarFieldDate } from './CalendarFieldDate'

export type UseCalendarFieldConfigOptions = {
	min?: Date
	max?: Date
}

export const useCalendarFieldConfig = ({
	min,
	max
}: UseCalendarFieldConfigOptions) =>
	useMemo(
		() => ({
			min: CalendarFieldDate.fromDate(min),
			max: CalendarFieldDate.fromDate(max),
			today: CalendarFieldDate.fromToday()
		}),
		[min, max]
	)
