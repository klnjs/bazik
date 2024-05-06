import { useState } from 'react'
import { isArray } from '@klnjs/assertion'
import { getToday } from '@klnjs/temporal'
import type { LocaleCalendar } from '@klnjs/locale'
import type { PlainDate, PlainDateRange } from './CalendarTypes'

export type UseCalendarHighlightedOptions = {
	date?: PlainDate | PlainDate[] | PlainDateRange | null
	calendar: LocaleCalendar
}

export const useCalendarHighlighted = ({
	date,
	calendar
}: UseCalendarHighlightedOptions) => {
	const [highlighted, setHighlighted] = useState(() => {
		if (!date) {
			return getToday(calendar)
		}

		return (isArray(date) ? date[0] : date).withCalendar(calendar)
	})

	return {
		highlighted,
		setHighlighted
	}
}
