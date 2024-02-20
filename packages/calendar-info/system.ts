import { isProperty } from '../core'

export const getSystem = (tag: string) => {
	const locale = new Intl.Locale(tag)

	if (isProperty(locale, 'getCalendars')) {
		// @ts-expect-error getCalendars not in typescript yet
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		return (locale.getCalendars() as string[])[0]
	}

	return new Intl.DateTimeFormat(tag).resolvedOptions().calendar
}
