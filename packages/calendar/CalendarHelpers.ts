import { Temporal } from 'temporal-polyfill'
import { getCalendarWeekInfo } from './useCalendarWeekInfo'
import type { CalendarDate } from './CalendarDate'

export const getToday = (): CalendarDate => Temporal.Now.plainDateISO()

export const getDayOfWeek = (date: CalendarDate, locale: string) =>
	((date.dayOfWeek - getCalendarWeekInfo(locale).firstDay + 7) % 7) + 1

export const getWeekOfYear = (date: CalendarDate, locale: string) =>
	toDayOfWeek(date, locale, 4).weekOfYear

export const toStartOfWeek = (
	date: CalendarDate,
	locale: string
): CalendarDate => date.subtract({ days: getDayOfWeek(date, locale) - 1 })

export const toStartOfMonth = (date: CalendarDate): CalendarDate =>
	date.with({ day: 1 })

export const toEndOfWeek = (date: CalendarDate, locale: string): CalendarDate =>
	toDayOfWeek(date, locale, 7)

export const toEndOfMonth = (date: CalendarDate): CalendarDate =>
	date.with({ day: date.daysInMonth })

export const toDayOfWeek = (
	date: CalendarDate,
	locale: string,
	day: number
): CalendarDate => toStartOfWeek(date, locale).add({ days: day - 1 })

export const toClamp = (
	date: CalendarDate,
	min?: CalendarDate,
	max?: CalendarDate
): CalendarDate => {
	if (min && isBefore(date, min)) {
		return min
	}

	if (max && isAfter(date, max)) {
		return max
	}

	return date
}

export const isEquals = (date: CalendarDate, subject: CalendarDate) =>
	Temporal.PlainDate.compare(date, subject) === 0

export const isEqualsYear = (date: CalendarDate, subject: CalendarDate) =>
	date.year === subject.year

export const isEqualsMonth = (date: CalendarDate, subject: CalendarDate) =>
	date.month === subject.month && isEqualsYear(date, subject)

export const isAfter = (date: CalendarDate, subject: CalendarDate) =>
	Temporal.PlainDate.compare(date, subject) === 1

export const isBefore = (date: CalendarDate, subject: CalendarDate) =>
	Temporal.PlainDate.compare(date, subject) === -1

export const isBetween = (
	date: CalendarDate,
	min: CalendarDate,
	max: CalendarDate
) => isAfter(date, min) && isBefore(date, max)

export const isToday = (date: CalendarDate) => date.equals(getToday())

export const isWeekend = (date: CalendarDate, locale: string) =>
	getCalendarWeekInfo(locale).weekend.includes(date.dayOfWeek)

export const isStartOfWeek = (date: CalendarDate, locale: string) =>
	getDayOfWeek(date, locale) === 1

export const isEndOfWeek = (date: CalendarDate, locale: string) =>
	getDayOfWeek(date, locale) === 7
