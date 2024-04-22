export const getCalendars = (tag: string) => {
	const locale = new Intl.Locale(tag)

	if (locale.getCalendars !== undefined) {
		return locale.getCalendars()
	}

	const calendar = new Intl.DateTimeFormat(tag).resolvedOptions()
		.calendar as Intl.LocaleCalendar

	return [calendar]
}
