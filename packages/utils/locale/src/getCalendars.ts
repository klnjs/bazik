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

export const getCalendars = (tag: string) => {
	const locale = new Intl.Locale(tag)

	if (locale.getCalendars !== undefined) {
		return locale.getCalendars()
	}

	const calendar = new Intl.DateTimeFormat(tag).resolvedOptions()
		.calendar as LocaleCalendar

	return [calendar]
}
