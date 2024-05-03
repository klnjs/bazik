declare namespace Intl {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Locale extends LocaleOptions {
		/** Returns a weekInfo object with the properties firstDay, weekend and minimalDays for this locale. */
		/* eslint-disable-next-line @typescript-eslint/consistent-type-imports */
		getWeekInfo?: () => import('./src/getWeekInfo').LocaleWeekInfo
		/** Returns a list of one or more unique calendar identifiers for this locale. */
		/* eslint-disable-next-line @typescript-eslint/consistent-type-imports */
		getCalendars?: () => import('./src/getCalendars').LocaleCalendar[]
	}
}
