import { Temporal } from 'temporal-polyfill'
import { getCalendarWeekInfo } from './useCalendarWeekInfo'

export const getToday = (): Temporal.PlainDate => Temporal.Now.plainDateISO()

export const getDayOfWeek = (locale: string, date: Temporal.PlainDate) =>
	((date.dayOfWeek - getCalendarWeekInfo(locale).firstDay + 7) % 7) + 1

export const getWeekOfYear = (locale: string, date: Temporal.PlainDate) =>
	toDayOfWeek(locale, date, 4).weekOfYear

export const toStartOfWeek = (
	locale: string,
	date: Temporal.PlainDate
): Temporal.PlainDate => date.subtract({ days: getDayOfWeek(locale, date) - 1 })

export const toEndOfWeek = (
	locale: string,
	date: Temporal.PlainDate
): Temporal.PlainDate => toDayOfWeek(locale, date, 7)

export const toStartOfMonth = (date: Temporal.PlainDate): Temporal.PlainDate =>
	date.with({ day: 1 })

export const toEndOfMonth = (date: Temporal.PlainDate): Temporal.PlainDate =>
	date.with({ day: date.daysInMonth })

export const toDayOfWeek = (
	locale: string,
	date: Temporal.PlainDate,
	day: number
): Temporal.PlainDate => toStartOfWeek(locale, date).add({ days: day - 1 })

export const clamp = (
	date: Temporal.PlainDate,
	min?: Temporal.PlainDate,
	max?: Temporal.PlainDate
): Temporal.PlainDate =>
	min && isBefore(date, min) ? min : max && isAfter(date, max) ? max : date

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

export const isSameYear = (
	date: Temporal.PlainDate,
	subject: Temporal.PlainDate
) => date.year === subject.year

export const isSameMonth = (
	date: Temporal.PlainDate,
	subject: Temporal.PlainDate
) => isSameYear(date, subject) && date.month === subject.month

export const isToday = (date: Temporal.PlainDate) => date.equals(getToday())

export const isWeekend = (locale: string, date: Temporal.PlainDate) =>
	getCalendarWeekInfo(locale).weekend.includes(date.dayOfWeek)

export const isStartOfWeek = (locale: string, date: Temporal.PlainDate) =>
	getDayOfWeek(locale, date) === 1

export const isEndOfWeek = (locale: string, date: Temporal.PlainDate) =>
	getDayOfWeek(locale, date) === 7
