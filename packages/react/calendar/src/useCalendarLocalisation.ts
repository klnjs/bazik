import { useMemo, useCallback } from 'react'
import { isProperty } from '@klnjs/assertion'

export const calendarLocalisation = {
	en: {
		set: 'Jump to {{date}}',
		inc: 'Next {{segment}}',
		dec: 'Previous {{segment}}'
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
			const lang = isProperty(calendarLocalisation, locale)
				? (locale as CalendarLocalisationLocale)
				: 'en'

			return Object.entries(interpolation).reduce<string>(
				(acc, [name, value]) => acc.replaceAll(`{{${name}}}`, value),
				calendarLocalisation[lang][key]
			)
		},
		[locale]
	)

	return { t }
}

export const useCalendarDateFieldNames = (locale: string) =>
	useMemo(
		() => ({
			names: new Intl.DisplayNames(locale, { type: 'dateTimeField' })
		}),
		[locale]
	)

export const useCalendarDayNames = (locale: string) =>
	useMemo(() => {
		const rtf = new Intl.RelativeTimeFormat(locale)

		return {
			names: {
				of: (code: string) => {
					switch (code) {
						case 'today':
							return rtf.format(0, 'day')
						case 'yesterday':
							return rtf.format(-1, 'day')
						case 'tommorow':
							return rtf.format(1, 'day')
						default:
							return code
					}
				},
				resolvedOptions: () => ({
					type: 'days',
					locale,
					style: 'long',
					fallback: 'code'
				})
			}
		}
	}, [locale])
