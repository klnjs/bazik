import type { Range } from '../core'
import { weekInfo } from './calendarWeekInfo'

export const calendarDateSegmentTypes = ['year', 'month', 'day'] as const

export type CalendarDateSegmentType = (typeof calendarDateSegmentTypes)[number]

export type CalendarDateSegmentTypeWithLiteral =
	| CalendarDateSegmentType
	| 'literal'

export type CalendarDateSegmentStyle = 'numeric' | '2-digit'

export type CalendarDateSegment = {
	type: CalendarDateSegmentType
	value: string
	index: number
}

export type CalendarDateSegmentWithLiterals = {
	type: CalendarDateSegmentTypeWithLiteral
	value: string
	index: number
}

export type CalendarDateMutation = {
	[key in CalendarDateSegmentType]?: number
}

export type CalendarDateRange = Range<CalendarDate>

export class CalendarDate {
	date: Date
	locale: string

	constructor(locale?: string, date?: Date | null) {
		this.date = date ?? new Date()
		this.locale = locale ?? navigator.language
	}

	static isSegment(
		segment: Intl.DateTimeFormatPart
	): segment is CalendarDateSegment {
		return calendarDateSegmentTypes.includes(
			segment.type as CalendarDateSegmentType
		)
	}

	static isLiteral(
		segment: Intl.DateTimeFormatPart
	): segment is CalendarDateSegmentWithLiterals {
		return segment.type === 'literal'
	}

	set({ year, month, day }: CalendarDateMutation) {
		const date = this.getDate()
		const next = new Date()

		next.setFullYear(year ?? date.getFullYear())
		next.setMonth(month ? month - 1 : date.getMonth())
		next.setDate(day ?? date.getDate())

		return new CalendarDate(this.locale, next)
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

	calc({ year = 0, month = 0, day = 0 }: CalendarDateMutation = {}) {
		const date = this.getDate()
		const dateOriginalDay = date.getDate()

		date.setFullYear(date.getFullYear() + year)
		date.setMonth(date.getMonth() + month)

		if (dateOriginalDay !== date.getDate()) {
			date.setDate(0)
		}

		date.setDate(date.getDate() + day)

		return new CalendarDate(this.locale, date)
	}

	clone() {
		return new CalendarDate(this.locale, this.getDate())
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

	format(options?: Intl.DateTimeFormatOptions) {
		return this.getDate().toLocaleString(this.locale, options)
	}

	formatRelative(
		target: CalendarDate,
		segment: CalendarDateSegmentType,
		options?: Intl.RelativeTimeFormatOptions
	) {
		const diff = this.getDiff(target)
		const segmentDiff = diff[segment]

		return new Intl.RelativeTimeFormat(this.locale, options).format(
			segmentDiff,
			segment
		)
	}

	getYear() {
		return this.getDate().getFullYear()
	}

	getMonth() {
		// Normalize month value
		return this.getDate().getMonth() + 1
	}

	getDay() {
		return this.getDate().getDate()
	}

	getTime() {
		return this.getDate().getTime()
	}

	getDiff(date: CalendarDate) {
		const difference = date.getTime() - this.getTime()
		const oneDay = 1000 * 60 * 60 * 24 // Number of milliseconds in a day
		const oneYear = oneDay * 365.25 // Average number of days in a year
		const oneMonth = oneDay * 30.436875 // Average number of days in a month

		return {
			year: Math.floor(difference / oneYear),
			month: Math.floor((difference % oneYear) / oneMonth),
			day: Math.floor(((difference % oneYear) % oneMonth) / oneDay)
		}
	}

	getLocale() {
		return this.locale
	}

	getSegments<L extends boolean = false>({
		style = 'numeric',
		literals
	}: {
		style?: CalendarDateSegmentStyle
		literals?: L
	} = {}) {
		return new Intl.DateTimeFormat(this.locale, {
			year: 'numeric',
			month: style,
			day: style
		})
			.formatToParts(this.getDate())
			.reduce<CalendarDateSegmentWithLiterals[]>((acc, part, index) => {
				if (CalendarDate.isSegment(part)) {
					acc.push({ ...part, index })
				}

				if (literals === true && CalendarDate.isLiteral(part)) {
					acc.push({ ...part, index })
				}

				return acc
			}, []) as L extends true
			? CalendarDateSegmentWithLiterals[]
			: CalendarDateSegment[]
	}

	getSegment(
		type: CalendarDateSegmentType,
		style?: CalendarDateSegmentStyle
	) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return this.getSegments({ style }).find(
			(segment) => segment.type === type
		)!
	}

	getFirstDateOfWeek() {
		return this.sub({ day: this.getWeekDay() - 1 })
	}

	getFirstDateOfMonth() {
		return this.set({ day: 1 })
	}

	getLastDateOfWeek() {
		return this.getFirstDateOfWeek().add({ day: 6 })
	}

	getLastDateOfMonth() {
		return this.set({ month: this.getMonth() + 1, day: 0 })
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

	getWeekDay() {
		const firstDayOfWeek = (() => {
			try {
				// @ts-expect-error not in spec yet
				// eslint-disable-next-line
				return new Intl.Locale(this.locale).getWeekInfo()
					.firstDay as number
			} catch (error) {
				return weekInfo[
					new Intl.Locale(this.locale).maximize()
						.region as keyof typeof weekInfo
				].firstDay
			}
		})()

		const dayOfWeek = this.getDate().getDay() || 7
		const dayOfWeekIndex = dayOfWeek - firstDayOfWeek
		const dayOfWeekOffset = dayOfWeekIndex < 0 ? 8 : 1

		return dayOfWeekIndex + dayOfWeekOffset
	}

	getDate() {
		return new Date(this.date)
	}

	isToday() {
		const today = new CalendarDate(this.locale)

		return (
			this.getYear() === today.getYear() &&
			this.getMonth() === today.getMonth() &&
			this.getDay() === today.getDay()
		)
	}

	isWeekend() {
		const weekend = (() => {
			try {
				// @ts-expect-error not in spec yet
				// eslint-disable-next-line
				return new Intl.Locale(this.locale).getWeekInfo()
					.weekend as number[]
			} catch (error) {
				return weekInfo[
					new Intl.Locale(this.locale).maximize()
						.region as keyof typeof weekInfo
				].weekend
			}
		})()

		const dayOfWeek = this.getDate().getDay() || 7

		return weekend.includes(dayOfWeek)
	}

	isAfter(date: CalendarDate | Date) {
		return this.getDate().getTime() > date.getTime()
	}

	isBefore(date: CalendarDate | Date) {
		return this.getDate().getTime() < date.getTime()
	}

	isSameYear(input: CalendarDate | Date) {
		const date =
			input instanceof Date ? new CalendarDate(this.locale, input) : input

		return this.getYear() === date.getYear()
	}

	isSameMonth(input: CalendarDate | Date) {
		const date =
			input instanceof Date ? new CalendarDate(this.locale, input) : input

		return this.isSameYear(date) && this.getMonth() === date.getMonth()
	}

	isSameDay(input: CalendarDate | Date) {
		const date =
			input instanceof Date ? new CalendarDate(this.locale, input) : input

		return (
			this.isSameYear(date) &&
			this.isSameMonth(date) &&
			this.getDay() === date.getDay()
		)
	}
}

const d = new CalendarDate()

const aaa = d.getSegments({ literals: true })
