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
			min: min ? new CalendarDate(min) : undefined,
			max: max ? new CalendarDate(max) : undefined,
			today: new CalendarDate(),
			locale
		}),
		[min, max, locale]
	)
