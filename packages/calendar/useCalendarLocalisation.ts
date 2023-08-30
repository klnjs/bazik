import { useMemo, useCallback } from 'react'
import { isRecordProperty } from '../core'

export const calendarLocalisation = {
	en: {
		next: 'Next {{segment}}',
		previous: 'Previous {{segment}}'
	},
	da: {
		next: 'Næste {{segment}}',
		previous: 'Forrige {{segment}}'
	}
} as const

export type CalendarLocalisationLocale = keyof typeof calendarLocalisation

export type CalendarLocalisationKey = keyof (typeof calendarLocalisation)['en']

export const useCalendarLocalisation = (locale: string) => {
	const t = useCallback(
		(
			key: CalendarLocalisationKey,
			interpolation: Record<string, string> = {}
		) => {
			const lang: CalendarLocalisationLocale = isRecordProperty(
				calendarLocalisation,
				locale
			)
				? locale
				: 'en'

			return Object.entries(interpolation).reduce<string>(
				(acc, [name, value]) => acc.replaceAll(`{{${name}}}`, value),
				calendarLocalisation[lang][key]
			)
		},
		[locale]
	)

	const names = useMemo(() => {
		const dn = new Intl.DisplayNames(locale, { type: 'dateTimeField' })
		const rtf = new Intl.RelativeTimeFormat(locale)

		return {
			of: (code: string) => {
				switch (code) {
					case 'today':
						return rtf.format(0, 'day')
					case 'yesterday':
						return rtf.format(-1, 'day')
					case 'tommorow':
						return rtf.format(1, 'day')
					default:
						return dn.of(code)
				}
			},
			resolvedOptions: () => ({
				type: 'calendar',
				locale,
				style: 'long',
				fallback: 'code'
			})
		}
	}, [locale])

	return { t, names }
}
