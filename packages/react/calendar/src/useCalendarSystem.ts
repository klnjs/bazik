import { useMemo } from 'react'
import { getCalendars } from '@klnjs/locale'

export type UseCalendarSystemOptions = {
	locale: string
	calendar?: string
}

export const useCalendarSystem = ({
	locale,
	calendar
}: UseCalendarSystemOptions) => {
	const system = useMemo(
		() => calendar ?? getCalendars(locale)[0],
		[calendar, locale]
	)

	return { calendar: system }
}
