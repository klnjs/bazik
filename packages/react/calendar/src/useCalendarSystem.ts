import { useMemo } from 'react'
import { getCalendar } from '@klnjs/locale'

export type UseCalendarSystemOptions = {
	locale: string
	calendar?: string
}

export const useCalendarSystem = ({
	locale,
	calendar
}: UseCalendarSystemOptions) => {
	const system = useMemo(
		() => calendar ?? getCalendar(locale),
		[calendar, locale]
	)

	return { calendar: system }
}
