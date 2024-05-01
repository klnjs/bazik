import { Temporal } from 'temporal-polyfill'
import { getWeekInfo } from '@klnjs/locale'
import type { PlainDate } from './CalendarTypes'

export const getToday = (calendar = 'iso8601') =>
	Temporal.Now.plainDate(calendar)

export const getDayOfWeek = (date: PlainDate, locale: string) =>
	((date.dayOfWeek - getWeekInfo(locale).firstDay + 7) % 7) + 1

export const getWeekOfYear = (date: PlainDate, locale: string) =>
	toDayOfWeek(date, 4, locale).weekOfYear

export const toDayOfWeek = (date: PlainDate, day: number, locale: string) =>
	date
		.subtract({ days: getDayOfWeek(date, locale) - 1 })
		.add({ days: day - 1 })

export const toStartOfWeek = (date: PlainDate, locale: string) =>
	toDayOfWeek(date, 1, locale)

export const toEndOfWeek = (date: PlainDate, locale: string) =>
	toDayOfWeek(date, date.daysInWeek, locale)

export const toStartOfMonth = (date: PlainDate) => date.with({ day: 1 })

export const toEndOfMonth = (date: PlainDate) =>
	date.with({ day: date.daysInMonth })

export const toStartOfYear = (date: PlainDate) =>
	toStartOfMonth(date.with({ month: 1 }))

export const toEndOfYear = (date: PlainDate) =>
	toEndOfMonth(date.with({ month: date.monthsInYear }))

export const clamp = (
	date: PlainDate,
	options: { min?: PlainDate; max?: PlainDate }
) => {
	if (options.min && isBefore(date, options.min)) {
		return options.min
	}
	if (options.max && isAfter(date, options.max)) {
		return options.max
	}

	return date
}

export const compare = (date: PlainDate, subject: PlainDate) =>
	Temporal.PlainDate.compare(date, subject)

export const isAfter = (date: PlainDate, subject: PlainDate) =>
	compare(date, subject) === 1

export const isBefore = (date: PlainDate, subject: PlainDate) =>
	compare(date, subject) === -1

export const isBetween = (date: PlainDate, min: PlainDate, max: PlainDate) =>
	isAfter(date, min) && isBefore(date, max)

export const isSameYear = (date: PlainDate, subject: PlainDate) =>
	date.year === subject.year

export const isSameMonth = (date: PlainDate, subject: PlainDate) =>
	Temporal.PlainYearMonth.compare(date, subject) === 0

export const isSameDay = (date: PlainDate, subject: PlainDate) =>
	compare(date, subject) === 0

export const isToday = (date: PlainDate) => isSameDay(date, getToday())

export const isWeekend = (date: PlainDate, locale: string) =>
	getWeekInfo(locale).weekend.includes(date.dayOfWeek)

export const isStartOfWeek = (date: PlainDate, locale: string) =>
	getDayOfWeek(date, locale) === 1

export const isEndOfWeek = (date: PlainDate, locale: string) =>
	getDayOfWeek(date, locale) === 7
