import { isProperty } from '@klnjs/assertion'

export const calendarLocalisation = {
	en: {
		set: 'Jump to {{date}}',
		inc: 'Next {{unit}}',
		dec: 'Previous {{unit}}'
	}
} as const

export type CalendarLocalisationLocale = keyof typeof calendarLocalisation

export type CalendarLocalisationKey = keyof (typeof calendarLocalisation)['en']

export const useCalendarLocalisation = (locale: string) => {
	const t = (
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
	}

	const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

	const fieldNames = new Intl.DisplayNames(locale, { type: 'dateTimeField' })

	// @ts-expect-error days not valid on interface
	const dayNames: Intl.DisplayNames = {
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
			// @ts-expect-error days not valid on interface
			type: 'days',
			locale,
			style: 'long',
			fallback: 'code'
		})
	} satisfies Intl.DisplayNames

	return { t, fieldNames, dayNames }
}
