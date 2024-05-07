export type LocaleCalendar =
	| 'buddhist'
	| 'chinese'
	| 'coptic'
	| 'dangi'
	| 'ethioaa'
	| 'ethiopic'
	| 'gregory'
	| 'hebrew'
	| 'indian'
	| 'islamic'
	| 'islamic-umalqura'
	| 'islamic-tbla'
	| 'islamic-civil'
	| 'islamic-rgsa'
	| 'iso8601'
	| 'japanese'
	| 'persian'
	| 'roc'
	| 'islamicc'

export const getCalendars = (tag: string): LocaleCalendar[] => {
	const locale = new Intl.Locale(tag).maximize()

	/* eslint-disable */
	// @ts-expect-error getCalendars not in spec yet
	if (locale.getCalendars !== undefined) {
		// @ts-expect-error getCalendars not in spec yet
		return locale.getCalendars() as LocaleCalendar[]
	}
	/* eslint-enable */

	const calendar = new Intl.DateTimeFormat(tag).resolvedOptions()
		.calendar as LocaleCalendar

	return [calendar]
}
