import { useMemo } from 'react'
import { CalendarDate } from './CalendarDate'

export type UseCalendarConfigOptions = {
	min?: Date
	max?: Date
	locale?: string
}

export const useCalendarConfig = ({
	min,
	max,
	locale = navigator.language
}: UseCalendarConfigOptions) =>
	useMemo(
		() => ({
			min: CalendarDate.fromDate(min),
			max: CalendarDate.fromDate(max),
			today: CalendarDate.fromToday(),
			locale
		}),
		[min, max, locale]
	)
