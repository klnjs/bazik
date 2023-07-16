import { useMemo } from 'react'
import { useCalendarContext } from './CalendarContext'

export const useCalendarLocalisation = () => {
	const {
		config: { locale }
	} = useCalendarContext()

	return useMemo(
		() => new Intl.DisplayNames(locale, { type: 'dateTimeField' }),
		[locale]
	)
}
