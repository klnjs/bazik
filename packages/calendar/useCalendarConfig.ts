import { useMemo } from 'react'
import { CalendarDate } from './CalendarDate'

export type UseCalendarConfigOptions = {
	min?: Date
	max?: Date
}

export const useCalendarConfig = ({ min, max }: UseCalendarConfigOptions) =>
	useMemo(
		() => ({
			min: CalendarDate.fromDate(min),
			max: CalendarDate.fromDate(max),
			today: CalendarDate.fromToday(),
			locale: 'da'
		}),
		[min, max]
	)
