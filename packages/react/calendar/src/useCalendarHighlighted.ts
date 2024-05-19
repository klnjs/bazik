import { useState } from 'react'
import { isArray } from '@klnjs/assertion'
import { plainDate } from '@klnjs/temporal'
import type { LocaleCalendar } from '@klnjs/locale'
import type { PlainDate, PlainDateRange } from './CalendarTypes'

export type UseCalendarHighlightedOptions = {
	value?: PlainDate | PlainDate[] | PlainDateRange | null
	calendar: LocaleCalendar
}

export const useCalendarHighlighted = ({
	value,
	calendar
}: UseCalendarHighlightedOptions) => {
	const [highlighted, setHighlighted] = useState(() => {
		if (!value) {
			return plainDate.getToday(calendar)
		}

		if (isArray(value)) {
			return value[0].withCalendar(calendar)
		}

		return value.withCalendar(calendar)
	})

	return [highlighted, setHighlighted] as [
		typeof highlighted,
		typeof setHighlighted
	]
}
