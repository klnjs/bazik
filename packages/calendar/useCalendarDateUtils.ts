import { Temporal } from 'temporal-polyfill'
import type { PlainDate, PlainDateRange } from './CalendarTypes'
import { getCalendarWeekInfo } from './useCalendarWeekInfo'

export const getToday = () => Temporal.Now.plainDateISO()

export const getDayOfWeek = (date: PlainDate, locale: string) =>
	((date.dayOfWeek - getCalendarWeekInfo(locale).firstDay + 7) % 7) + 1

export const getWeekOfYear = (date: PlainDate, locale: string) =>
	toDayOfWeek(date, 4, locale).weekOfYear

export const toStartOfWeek = (date: PlainDate, locale: string) =>
	date.subtract({ days: getDayOfWeek(date, locale) - 1 })

export const toEndOfWeek = (date: PlainDate, locale: string) =>
	toDayOfWeek(date, 7, locale)

export const toStartOfYear = (date: PlainDate) =>
	toStartOfMonth(date.with({ month: 1 }))

export const toEndOfYear = (date: PlainDate) =>
	toEndOfMonth(date.with({ month: 1 }))

export const toStartOfMonth = (date: PlainDate) => date.with({ day: 1 })

export const toEndOfMonth = (date: PlainDate) =>
	date.with({ day: date.daysInMonth })

export const toDayOfWeek = (
	date: PlainDate,
	day: number,
	locale: string
): PlainDate => toStartOfWeek(date, locale).add({ days: day - 1 })

export const range = (
	lower: PlainDate,
	upper: PlainDate,
	expand: 'year' | 'month' = 'month'
): PlainDateRange => {
	switch (expand) {
		case 'year':
			return [toStartOfYear(lower), toEndOfYear(upper)]
		case 'month':
			return [toStartOfMonth(lower), toEndOfMonth(upper)]
		default:
			throw new Error('Invalid type')
	}
}

export const clamp = (date: PlainDate, min?: PlainDate, max?: PlainDate) =>
	min && isBefore(date, min) ? min : max && isAfter(date, max) ? max : date

export const compare = (date: PlainDate, subject: PlainDate) =>
	Temporal.PlainDate.compare(date, subject)

export const isAfter = (date: PlainDate, subject: PlainDate) =>
	compare(date, subject) === 1

export const isBefore = (date: PlainDate, subject: PlainDate) =>
	compare(date, subject) === -1

export const isBetween = (date: PlainDate, min: PlainDate, max: PlainDate) =>
	isAfter(date, min) && isBefore(date, max)

export const isBetweenInclusive = (
	date: PlainDate,
	min: PlainDate,
	max: PlainDate
) => date.equals(min) || date.equals(max) || isBetween(date, min, max)

export const isSameYear = (date: PlainDate, subject: PlainDate) =>
	date.year === subject.year

export const isSameMonth = (date: PlainDate, subject: PlainDate) =>
	isSameYear(date, subject) && date.month === subject.month

export const isToday = (date: PlainDate) => date.equals(getToday())

export const isWeekend = (date: PlainDate, locale: string) =>
	getCalendarWeekInfo(locale).weekend.includes(date.dayOfWeek)

export const isStartOfWeek = (date: PlainDate, locale: string) =>
	getDayOfWeek(date, locale) === 1

export const isEndOfWeek = (date: PlainDate, locale: string) =>
	getDayOfWeek(date, locale) === 7
