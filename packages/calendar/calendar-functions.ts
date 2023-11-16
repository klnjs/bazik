import { Temporal } from 'temporal-polyfill'
import { getCalendarWeekInfo } from './calendar-info'
import type { Date } from './calendar-types'

export const getToday = (calendar = 'iso8601') =>
	Temporal.Now.plainDate(calendar)

export const getDayOfWeek = (date: Date, locale: string) =>
	((date.dayOfWeek - getCalendarWeekInfo(locale).firstDay + 7) % 7) + 1

export const getWeekOfYear = (date: Date, locale: string) =>
	toDayOfWeek(date, 4, locale).weekOfYear

export const toDayOfWeek = (date: Date, day: number, locale: string): Date =>
	date
		.subtract({ days: getDayOfWeek(date, locale) - 1 })
		.add({ days: day - 1 })

export const toStartOfWeek = (date: Date, locale: string) =>
	toDayOfWeek(date, 1, locale)

export const toEndOfWeek = (date: Date, locale: string) =>
	toDayOfWeek(date, date.daysInWeek, locale)

export const toStartOfMonth = (date: Date) => date.with({ day: 1 })

export const toEndOfMonth = (date: Date) => date.with({ day: date.daysInMonth })

export const toStartOfYear = (date: Date) =>
	toStartOfMonth(date.with({ month: 1 }))

export const toEndOfYear = (date: Date) =>
	toEndOfMonth(date.with({ month: date.monthsInYear }))

export const clamp = (date: Date, options: { min?: Date; max?: Date }) => {
	if (options.min && isBefore(date, options.min)) {
		return options.min
	}
	if (options.max && isAfter(date, options.max)) {
		return options.max
	}

	return date
}

export const compare = (date: Date, subject: Date) =>
	Temporal.PlainDate.compare(date, subject)

export const isAfter = (date: Date, subject: Date) =>
	compare(date, subject) === 1

export const isBefore = (date: Date, subject: Date) =>
	compare(date, subject) === -1

export const isBetween = (date: Date, min: Date, max: Date) =>
	isAfter(date, min) && isBefore(date, max)

export const isSameYear = (date: Date, subject: Date) =>
	date.year === subject.year

export const isSameMonth = (date: Date, subject: Date) =>
	Temporal.PlainYearMonth.compare(date, subject) === 0

export const isSameDay = (date: Date, subject: Date) =>
	compare(date, subject) === 0

export const isToday = (date: Date) => isSameDay(date, getToday())

export const isWeekend = (date: Date, locale: string) =>
	getCalendarWeekInfo(locale).weekend.includes(date.dayOfWeek)

export const isStartOfWeek = (date: Date, locale: string) =>
	getDayOfWeek(date, locale) === 1

export const isEndOfWeek = (date: Date, locale: string) =>
	getDayOfWeek(date, locale) === 7
