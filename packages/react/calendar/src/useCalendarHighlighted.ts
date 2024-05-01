import { useState } from 'react'
import { isArray } from '@klnjs/assertion'
import { getToday } from './calendar-functions'
import type { PlainDate, PlainDateRange } from './CalendarTypes'

export type UseCalendarHighlightedOptions = {
	value?: PlainDate | PlainDate[] | PlainDateRange | null
	calendar: string
}

export const useCalendarHighlighted = ({
	calendar,
	value
}: UseCalendarHighlightedOptions) => {
	const [highlighted, setHighlighted] = useState(() => {
		if (!value) {
			return getToday(calendar)
		}

		return (isArray(value) ? value[0] : value).withCalendar(calendar)
	})

	return {
		highlighted,
		setHighlighted
	}
}
