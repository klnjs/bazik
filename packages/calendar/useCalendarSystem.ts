import { useMemo } from 'react'
import { getCalendarSystem } from './calendar-info'

export type UseCalendarSystemOptions = {
	locale: string
	calendar?: string
}

export const useCalendarSystem = ({
	locale,
	calendar
}: UseCalendarSystemOptions) => {
	const system = useMemo(
		() => calendar ?? getCalendarSystem(locale),
		[calendar, locale]
	)

	return { calendar: system }
}
