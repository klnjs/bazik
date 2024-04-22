declare namespace Intl {
	type LocaleWeekInfo = {
		firstDay: number
		minimalDays: number
		weekend: number[]
	}

	type LocaleCalendar =
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

	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Locale extends LocaleOptions {
		/** Returns a weekInfo object with the properties firstDay, weekend and minimalDays for this locale. */
		getWeekInfo?: () => LocaleWeekInfo
		/** Returns a list of one or more unique calendar identifiers for this locale. */
		getCalendars?: () => LocaleCalendar[]
	}
}
