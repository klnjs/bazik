import { useState } from 'react'
import { isArray } from '@klnjs/core'
import { getToday } from './calendar-functions'
import type { Date, DateRange } from './calendar-types'

export type UseCalendarHighlightedOptions = {
	value?: Date | Date[] | DateRange | null
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
