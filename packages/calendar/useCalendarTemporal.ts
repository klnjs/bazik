import { Temporal } from 'temporal-polyfill'
import { getCalendarWeekInfo } from './useCalendarWeekInfo'

export const getToday = (): Temporal.PlainDate => Temporal.Now.plainDateISO()

export const getDayOfWeek = (date: Temporal.PlainDate, locale: string) =>
	((date.dayOfWeek - getCalendarWeekInfo(locale).firstDay + 7) % 7) + 1

export const getWeekOfYear = (date: Temporal.PlainDate, locale: string) =>
	toDayOfWeek(date, locale, 4).weekOfYear

export const toStartOfWeek = (
	date: Temporal.PlainDate,
	locale: string
): Temporal.PlainDate => date.subtract({ days: getDayOfWeek(date, locale) - 1 })

export const toStartOfMonth = (date: Temporal.PlainDate): Temporal.PlainDate =>
	date.with({ day: 1 })

export const toEndOfWeek = (
	date: Temporal.PlainDate,
	locale: string
): Temporal.PlainDate => toDayOfWeek(date, locale, 7)

export const toEndOfMonth = (date: Temporal.PlainDate): Temporal.PlainDate =>
	date.with({ day: date.daysInMonth })

export const toDayOfWeek = (
	date: Temporal.PlainDate,
	locale: string,
	day: number
): Temporal.PlainDate => toStartOfWeek(date, locale).add({ days: day - 1 })

export const clamp = (
	date: Temporal.PlainDate,
	min?: Temporal.PlainDate,
	max?: Temporal.PlainDate
): Temporal.PlainDate => {
	if (min && isBefore(date, min)) {
		return min
	}

	if (max && isAfter(date, max)) {
		return max
	}

	return date
}

export const compare = (
	date: Temporal.PlainDate,
	subject: Temporal.PlainDate
) => Temporal.PlainDate.compare(date, subject)

export const isAfter = (
	date: Temporal.PlainDate,
	subject: Temporal.PlainDate
) => compare(date, subject) === 1

export const isBefore = (
	date: Temporal.PlainDate,
	subject: Temporal.PlainDate
) => compare(date, subject) === -1

export const isEquals = (
	date: Temporal.PlainDate,
	subject: Temporal.PlainDate
) => compare(date, subject) === 0

export const isEqualsToTheYear = (
	date: Temporal.PlainDate,
	subject: Temporal.PlainDate
) => date.year === subject.year

export const isEqualsToTheMonth = (
	date: Temporal.PlainDate,
	subject: Temporal.PlainDate
) => date.month === subject.month && isEqualsToTheYear(date, subject)

export const isBetween = (
	date: Temporal.PlainDate,
	min: Temporal.PlainDate,
	max: Temporal.PlainDate
) => isAfter(date, min) && isBefore(date, max)

export const isToday = (date: Temporal.PlainDate) => date.equals(getToday())

export const isWeekend = (date: Temporal.PlainDate, locale: string) =>
	getCalendarWeekInfo(locale).weekend.includes(date.dayOfWeek)

export const isStartOfWeek = (date: Temporal.PlainDate, locale: string) =>
	getDayOfWeek(date, locale) === 1

export const isEndOfWeek = (date: Temporal.PlainDate, locale: string) =>
	getDayOfWeek(date, locale) === 7
