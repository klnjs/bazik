import { isSet, isRecord, isArrayValue, type Range } from '../core'
import { getCalendarWeekInfo } from './useCalendarWeekInfo'

export const dateSegments = ['year', 'month', 'day'] as const

export const timeSegments = ['hour', 'minute'] as const

export const literalSegments = ['literal'] as const

export type SegmentStyle = 'numeric' | '2-digit'

export type DateSegmentType = (typeof dateSegments)[number]

export type TimeSegmentType = (typeof timeSegments)[number]

export type LiteralSegmentType = (typeof literalSegments)[number]

export type DateSegment = {
	type: DateSegmentType
	value: number
}

export type TimeSegment = {
	type: TimeSegmentType
	value: number
}

export type LiteralSegment = {
	type: LiteralSegmentType
	value: string
}

export type DateTimeMutation = {
	[key in DateSegmentType | TimeSegmentType]?: number
}

export type DateTimeRange = Range<DateTime>

export class DateTime {
	date: Date

	constructor(arg?: DateTime | Date | string | number | null) {
		if (isSet(arg)) {
			this.date = DateTime.isDateTime(arg)
				? new Date(arg.getTime())
				: new Date(arg)
		} else {
			this.date = new Date()
		}
	}

	static isDateTime(value: unknown): value is DateTime {
		return value instanceof DateTime
	}

	static isDateSegment(value: unknown): value is DateSegment {
		return isRecord(value) && isArrayValue(dateSegments, value.type)
	}

	static isTimeSegment(value: unknown): value is TimeSegment {
		return isRecord(value) && isArrayValue(timeSegments, value.type)
	}

	static isLiteralSegment(value: unknown): value is LiteralSegment {
		return isRecord(value) && isArrayValue(literalSegments, value.type)
	}

	set({ year, month, day, hour, minute }: DateTimeMutation) {
		const date = this.toDate()
		const next = new Date()

		next.setFullYear(year ?? date.getFullYear())
		next.setMonth(month ? month - 1 : date.getMonth())
		next.setDate(day ?? date.getDate())
		next.setHours(hour ?? date.getHours())
		next.setMinutes(minute ?? date.getMinutes())

		return new DateTime(next)
	}

	add(mutation: DateTimeMutation) {
		return this.calc(mutation)
	}

	sub(mutation: DateTimeMutation) {
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
	}: DateTimeMutation = {}) {
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

		return new DateTime(date)
	}

	clone() {
		return new DateTime(this)
	}

	clamp(min?: DateTime, max?: DateTime) {
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

	getHour() {
		return this.toDate().getHours()
	}

	getMinute() {
		return this.toDate().getMinutes()
	}

	getTime() {
		return this.toDate().getTime()
	}

	getSegments<L extends boolean = false>(locale: string, literals?: L) {
		return new Intl.DateTimeFormat(locale, {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric'
		})
			.formatToParts(this.toDate())
			.reduce<(DateSegment | TimeSegment | LiteralSegment)[]>(
				(acc, part) => {
					if (DateTime.isDateSegment(part)) {
						acc.push({ type: part.type, value: Number(part.value) })
					}

					if (DateTime.isTimeSegment(part)) {
						acc.push({ type: part.type, value: Number(part.value) })
					}

					if (DateTime.isLiteralSegment(part) && literals === true) {
						acc.push(part)
					}

					return acc
				},
				[]
			) as L extends false
			? (DateSegment | TimeSegment)[]
			: (DateSegment | TimeSegment | LiteralSegment)[]
	}

	getSegment(locale: string, type: DateSegmentType | TimeSegmentType) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return this.getSegments(locale).find(
			(segment) => segment.type === type
		)!
	}

	getSegmentLength(
		locale: string,
		type: DateSegmentType | TimeSegmentType,
		style: SegmentStyle
	) {
		return new Intl.DateTimeFormat(locale, {
			[type]: style
		}).formatToParts(this.toDate())[0].value.length
	}

	getMidnight() {
		return this.set({ hour: 0, minute: 0 })
	}

	getTommorow() {
		return this.add({ day: 1 })
	}

	getYesterday() {
		return this.sub({ day: 1 })
	}

	getStartOfWeek(locale: string) {
		return this.sub({ day: this.getWeekDay(locale) - 1 })
	}

	getStartOfMonth() {
		return this.set({ day: 1 })
	}

	getEndOfWeek(locale: string) {
		return this.getDayOfWeek(locale, 6)
	}

	getEndOfMonth() {
		return this.set({ month: this.getMonth() + 1, day: 0 })
	}

	getDayOfWeek(locale: string, day: number) {
		return this.getStartOfWeek(locale).add({ day })
	}

	getDaysInMonth() {
		return this.getEndOfMonth().getDay()
	}

	getWeekOfYear(locale: string) {
		const date = this.getDayOfWeek(locale, 4).getMidnight()
		const dateFirstWeek = date.set({ month: 1 })

		const millisecondsDiff = date.getTime() - dateFirstWeek.getTime()
		const millisecondsInWeek = 604800000

		return Math.round(millisecondsDiff / millisecondsInWeek) + 1
	}

	getWeekDay(locale: string) {
		const weekInfo = getCalendarWeekInfo(locale)
		const dayOfWeek = this.toDate().getDay() || 7
		const dayOfWeekIndex = dayOfWeek - weekInfo.firstDay
		const dayOfWeekOffset = dayOfWeekIndex < 0 ? 8 : 1

		return dayOfWeekIndex + dayOfWeekOffset
	}

	toDate() {
		return new Date(this.date)
	}

	toUTCString() {
		return this.toDate().toUTCString()
	}

	toLocaleString(locale: string, options?: Intl.DateTimeFormatOptions) {
		return this.toDate().toLocaleString(locale, options)
	}

	isToday() {
		const today = new DateTime()

		return (
			this.getYear() === today.getYear() &&
			this.getMonth() === today.getMonth() &&
			this.getDay() === today.getDay()
		)
	}

	isWeekend(locale: string) {
		const weekInfo = getCalendarWeekInfo(locale)
		const dayOfWeek = this.toDate().getDay() || 7

		return weekInfo.weekend.includes(dayOfWeek)
	}

	isAfter(date: DateTime) {
		return this.getTime() > date.getTime()
	}

	isBefore(date: DateTime) {
		return this.getTime() < date.getTime()
	}

	isBetween(min: DateTime, max: DateTime) {
		return !this.isBefore(min) && !this.isAfter(max)
	}

	isSameYear(date: DateTime) {
		return this.getYear() === date.getYear()
	}

	isSameMonth(date: DateTime) {
		return this.isSameYear(date) && this.getMonth() === date.getMonth()
	}

	isSameDay(date: DateTime) {
		return (
			this.isSameYear(date) &&
			this.isSameMonth(date) &&
			this.getDay() === date.getDay()
		)
	}
}
