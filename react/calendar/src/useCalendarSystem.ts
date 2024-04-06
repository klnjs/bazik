import { useMemo } from 'react'
import { getSystem } from '@klnjs/locale'

export type UseCalendarSystemOptions = {
	locale: string
	calendar?: string
}

export const useCalendarSystem = ({
	locale,
	calendar
}: UseCalendarSystemOptions) => {
	const system = useMemo(
		() => calendar ?? getSystem(locale),
		[calendar, locale]
	)

	return { calendar: system }
}
