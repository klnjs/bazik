export type TextInfo = {
	direction: 'ltr' | 'rtl'
}

export const getTextInfo = (tag: string): TextInfo => {
	const locale = new Intl.Locale(tag).maximize()

	/* eslint-disable */
	// @ts-expect-error getCalendars not in spec yet
	if (locale.getTextInfo !== undefined) {
		// @ts-expect-error getCalendars not in spec yet
		return locale.getTextInfo() as TextInfo
	}
	/* eslint-enable */

	return {
		direction: getDirection(locale.language)
	}
}

export const getDirection = (language: string) => {
	if (
		language.match(
			/^('ae'|'ar'|'arc'|'bcc'|'bqi'|'ckb'|'dv'|'fa'|'glk'|'he'|'ku'|'mzn'|'nqo'|'pnb'|'ps'|'sd'|'ug'|'ur'|'yi')$/i
		)
	) {
		return 'rtl'
	}

	return 'ltr'
}
