import { useMemo } from 'react'
import { getCalendars, type LocaleCalendar } from '@klnjs/locale'

export type UseCalendarSystemOptions = {
	locale: string
	calendar?: LocaleCalendar
}

export const useCalendarSystem = ({
	locale,
	calendar
}: UseCalendarSystemOptions) => {
	const system = useMemo(
		() => calendar ?? getCalendars(locale)[0] ?? 'iso8601',
		[calendar, locale]
	)

	return { calendar: system }
}
