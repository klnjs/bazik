import { useMemo, useCallback } from 'react'

const texts = {
	en: {
		next: 'Next {{segment}}',
		previous: 'Previous {{segment}}'
	},
	da: {
		next: 'Næste {{segment}}',
		previous: 'Forrige {{segment}}'
	}
} as const

export const useCalendarLocalisation = (locale = 'en') => {
	const names = useMemo(
		() => new Intl.DisplayNames(locale, { type: 'dateTimeField' }),
		[locale]
	)

	const t = useCallback(
		(
			key: keyof (typeof texts)['en'],
			interpolation: Record<string, string> = {}
		) => {
			// @ts-expect-error just hacking away
			const lang: keyof typeof texts = !texts[locale] ? 'en' : locale

			console.log(lang)

			return Object.entries(interpolation).reduce<string>(
				(acc, [name, value]) => acc.replaceAll(`{{${name}}}`, value),
				texts[lang][key]
			)
		},
		[locale]
	)

	return { t, names }
}
