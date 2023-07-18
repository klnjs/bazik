import { useMemo } from 'react'

export const useCalendarLocalisation = (locale: string) =>
	useMemo(
		() => new Intl.DisplayNames(locale, { type: 'dateTimeField' }),
		[locale]
	)
