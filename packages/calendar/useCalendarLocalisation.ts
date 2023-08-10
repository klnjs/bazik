import { useMemo, useCallback } from 'react'

export const calendarLocalisation = {
	en: {
		next: 'Next {{segment}}',
		previous: 'Previous {{segment}}'
	},
	da: {
		next: 'Næste {{segment}}',
		previous: 'Forrige {{segment}}'
	}
}

export type CalendarLocalisationLocale = keyof typeof calendarLocalisation

export type CalendarLocalisationKey = keyof (typeof calendarLocalisation)['en']

export const useCalendarLocalisation = (locale: string) => {
	const t = useCallback(
		(
			key: CalendarLocalisationKey,
			interpolation: Record<string, string> = {}
		) => {
			const lang: CalendarLocalisationLocale = Object.hasOwn(
				calendarLocalisation,
				locale
			)
				? (locale as CalendarLocalisationLocale)
				: 'en'

			return Object.entries(interpolation).reduce<string>(
				(acc, [name, value]) => acc.replaceAll(`{{${name}}}`, value),
				calendarLocalisation[lang][key]
			)
		},
		[locale]
	)

	const names = useMemo(
		() => new Intl.DisplayNames(locale, { type: 'dateTimeField' }),
		[locale]
	)

	return { t, names }
}
