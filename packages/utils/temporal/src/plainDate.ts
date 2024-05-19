import { Temporal } from 'temporal-polyfill'
import { getWeekInfo } from '@klnjs/locale'

export const getToday = (calendar: string) => Temporal.Now.plainDate(calendar)

export const getDayOfWeek = (date: Temporal.PlainDate, locale: string) =>
	((date.dayOfWeek - getWeekInfo(locale).firstDay + 7) % 7) + 1

export const getWeekOfYear = (date: Temporal.PlainDate, locale: string) =>
	toDayOfWeek(date, 4, locale).weekOfYear

export const toDayOfWeek = (
	date: Temporal.PlainDate,
	day: number,
	locale: string
) =>
	date
		.subtract({ days: getDayOfWeek(date, locale) - 1 })
		.add({ days: day - 1 })

export const toStartOfWeek = (date: Temporal.PlainDate, locale: string) =>
	toDayOfWeek(date, 1, locale)

export const toEndOfWeek = (date: Temporal.PlainDate, locale: string) =>
	toDayOfWeek(date, date.daysInWeek, locale)

export const toStartOfMonth = (date: Temporal.PlainDate) =>
	date.with({ day: 1 })

export const toEndOfMonth = (date: Temporal.PlainDate) =>
	date.with({ day: date.daysInMonth })

export const toStartOfYear = (date: Temporal.PlainDate) =>
	toStartOfMonth(date.with({ month: 1 }))

export const toEndOfYear = (date: Temporal.PlainDate) =>
	toEndOfMonth(date.with({ month: date.monthsInYear }))

export const clamp = (
	date: Temporal.PlainDate,
	min?: Temporal.PlainDate,
	max?: Temporal.PlainDate
) => {
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

export const isBetween = (
	date: Temporal.PlainDate,
	min: Temporal.PlainDate,
	max: Temporal.PlainDate
) => isAfter(date, min) && isBefore(date, max)

export const isBetweenInclusive = (
	date: Temporal.PlainDate,
	min: Temporal.PlainDate,
	max: Temporal.PlainDate
) => isEquals(date, min) || isEquals(date, max) || isBetween(date, min, max)

export const isSameYear = (
	date: Temporal.PlainDate,
	subject: Temporal.PlainDate
) => date.year === subject.year

export const isSameMonth = (
	date: Temporal.PlainDate,
	subject: Temporal.PlainDate
) => date.month === subject.month && isSameYear(date, subject)

export const isEquals = (
	date: Temporal.PlainDate,
	subject: Temporal.PlainDate
) => compare(date, subject) === 0

export const isToday = (date: Temporal.PlainDate) =>
	isEquals(date, getToday(date.calendarId))

export const isTommorow = (date: Temporal.PlainDate) =>
	isEquals(date, getToday(date.calendarId).add({ days: 1 }))

export const isYesterday = (date: Temporal.PlainDate) =>
	isEquals(date, getToday(date.calendarId).subtract({ days: 1 }))

export const isWeekend = (date: Temporal.PlainDate, locale: string) =>
	getWeekInfo(locale).weekend.includes(date.dayOfWeek)

export const isStartOfWeek = (date: Temporal.PlainDate, locale: string) =>
	getDayOfWeek(date, locale) === 1

export const isEndOfWeek = (date: Temporal.PlainDate, locale: string) =>
	getDayOfWeek(date, locale) === 7
