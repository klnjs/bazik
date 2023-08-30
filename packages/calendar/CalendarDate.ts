import { isRecord, type Range } from '../core'
import { getCalendarWeekInfo } from './useCalendarWeekInfo'

export const calendarDateSegmentTypes = [
	'year',
	'month',
	'day',
	'hour',
	'minute'
] as const

export type CalendarDateLocale = string

export type CalendarDateSegmentStyle = 'numeric' | '2-digit'

export type CalendarDateSegmentType = (typeof calendarDateSegmentTypes)[number]

export type CalendarDateSegment = {
	type: CalendarDateSegmentType
	value: number
}

export type CalendarDateLiteral = {
	type: 'literal'
	value: string
}

export type CalendarDateMutation = {
	[key in CalendarDateSegmentType]?: number
}

export type CalendarDateRange = Range<CalendarDate>

export class CalendarDate {
	date: Date

	constructor(date?: CalendarDate | Date | null) {
		this.date = date ? new Date(date.getTime()) : new Date()
	}

	static isCalendarDate(value: unknown): value is CalendarDate {
		return value instanceof CalendarDate
	}

	static isCalendarDateSegment(value: unknown): value is CalendarDateSegment {
		return (
			isRecord(value) &&
			calendarDateSegmentTypes.includes(
				value.type as CalendarDateSegmentType
			)
		)
	}

	static isCalendarDateLiteral(value: unknown): value is CalendarDateLiteral {
		return isRecord(value) && value.type === 'literal'
	}

	set({ year, month, day, hour, minute }: CalendarDateMutation) {
		const date = this.toDate()
		const next = new Date()

		next.setFullYear(year ?? date.getFullYear())
		next.setMonth(month ? month - 1 : date.getMonth())
		next.setDate(day ?? date.getDate())
		next.setHours(hour ?? date.getHours())
		next.setMinutes(minute ?? date.getMinutes())

		return new CalendarDate(next)
	}

	add(mutation: CalendarDateMutation) {
		return this.calc(mutation)
	}

	sub(mutation: CalendarDateMutation) {
		return this.calc(
			Object.fromEntries(
				Object.entries(mutation).map(([key, value = 0]) => [
					key,
					value * -1
				])
			)
		)
	}

	calc({
		year = 0,
		month = 0,
		day = 0,
		hour = 0,
		minute = 0
	}: CalendarDateMutation = {}) {
		const date = this.toDate()
		const dateOriginalDay = date.getDate()

		date.setFullYear(date.getFullYear() + year)
		date.setMonth(date.getMonth() + month)

		if (dateOriginalDay !== date.getDate()) {
			date.setDate(0)
		}

		date.setDate(date.getDate() + day)
		date.setHours(date.getHours() + hour)
		date.setMinutes(date.getMinutes() + minute)
		date.setSeconds(0)
		date.setMilliseconds(0)

		return new CalendarDate(date)
	}

	clone() {
		return new CalendarDate(this)
	}

	clamp(min?: CalendarDate, max?: CalendarDate) {
		if (min && this.isBefore(min)) {
			return min.clone()
		}

		if (max && this.isAfter(max)) {
			return max.clone()
		}

		return this
	}

	getYear() {
		return this.toDate().getFullYear()
	}

	getMonth() {
		// Normalize month value
		return this.toDate().getMonth() + 1
	}

	getDay() {
		return this.toDate().getDate()
	}

	getTime() {
		return this.toDate().getTime()
	}

	getSegments<L extends boolean = false>(
		locale: CalendarDateLocale,
		literals?: L
	) {
		return new Intl.DateTimeFormat(locale, {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric'
		})
			.formatToParts(this.toDate())
			.reduce<(CalendarDateSegment | CalendarDateLiteral)[]>(
				(acc, part) => {
					if (CalendarDate.isCalendarDateSegment(part)) {
						acc.push({ type: part.type, value: Number(part.value) })
					}

					if (
						CalendarDate.isCalendarDateLiteral(part) &&
						literals === true
					) {
						acc.push(part)
					}

					return acc
				},
				[]
			) as L extends false
			? CalendarDateSegment[]
			: (CalendarDateSegment | CalendarDateLiteral)[]
	}

	getSegment(locale: CalendarDateLocale, type: CalendarDateSegmentType) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return this.getSegments(locale).find(
			(segment) => segment.type === type
		)!
	}

	getSegmentLength(
		locale: CalendarDateLocale,
		type: CalendarDateSegmentType,
		style: CalendarDateSegmentStyle
	) {
		return new Intl.DateTimeFormat(locale, {
			[type]: style
		}).formatToParts(this.toDate())[0].value.length
	}

	getFirstDateOfWeek(locale: CalendarDateLocale) {
		return this.getMidnight().sub({ day: this.getWeekDay(locale) - 1 })
	}

	getFirstDateOfMonth() {
		return this.getMidnight().set({ day: 1 })
	}

	getLastDateOfWeek(locale: CalendarDateLocale) {
		return this.getFirstDateOfWeek(locale).add({ day: 6 })
	}

	getLastDateOfMonth() {
		return this.getMidnight().set({ month: this.getMonth() + 1, day: 0 })
	}

	getDaysInMonth() {
		return this.getLastDateOfMonth().getDay()
	}

	getWeek() {
		const date = new Date(this.getTime())
		date.setHours(0, 0, 0, 0)
		// Thursday in current week decides the year.
		date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7))
		// January 4 is always in week 1.
		const week1 = new Date(date.getFullYear(), 0, 4)
		// Adjust to Thursday in week 1 and count number of weeks from date to week1.
		return (
			1 +
			Math.round(
				((date.getTime() - week1.getTime()) / 86400000 -
					3 +
					((week1.getDay() + 6) % 7)) /
					7
			)
		)
	}

	getWeekDay(locale: CalendarDateLocale) {
		const weekInfo = getCalendarWeekInfo(locale)
		const dayOfWeek = this.toDate().getDay() || 7
		const dayOfWeekIndex = dayOfWeek - weekInfo.firstDay
		const dayOfWeekOffset = dayOfWeekIndex < 0 ? 8 : 1

		return dayOfWeekIndex + dayOfWeekOffset
	}

	getMidnight() {
		return this.set({ hour: 0, minute: 0 })
	}

	toDate() {
		return new Date(this.date)
	}

	toUTCString() {
		return this.toDate().toUTCString()
	}

	toLocaleString(
		locale: CalendarDateLocale,
		options?: Intl.DateTimeFormatOptions
	) {
		return this.toDate().toLocaleString(locale, options)
	}

	isToday() {
		const today = new CalendarDate()

		return (
			this.getYear() === today.getYear() &&
			this.getMonth() === today.getMonth() &&
			this.getDay() === today.getDay()
		)
	}

	isWeekend(locale: CalendarDateLocale) {
		const weekInfo = getCalendarWeekInfo(locale)
		const dayOfWeek = this.toDate().getDay() || 7

		return weekInfo.weekend.includes(dayOfWeek)
	}

	isAfter(date: CalendarDate) {
		return this.getTime() > date.getTime()
	}

	isBefore(date: CalendarDate) {
		return this.getTime() < date.getTime()
	}

	isBetween(min: CalendarDate, max: CalendarDate) {
		return !this.isBefore(min) && !this.isAfter(max)
	}

	isSameYear(date: CalendarDate) {
		return this.getYear() === date.getYear()
	}

	isSameMonth(date: CalendarDate) {
		return this.isSameYear(date) && this.getMonth() === date.getMonth()
	}

	isSameDay(date: CalendarDate) {
		return (
			this.isSameYear(date) &&
			this.isSameMonth(date) &&
			this.getDay() === date.getDay()
		)
	}
}
