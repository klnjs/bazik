import { capitalize } from '../core/capitalize'

export const calendarDateSegmentTypes = [
	'year',
	'month',
	'day',
	'literal'
] as const

export type CalendarDateSegmentType = (typeof calendarDateSegmentTypes)[number]

export type CalendarDateSegmentStyle = 'numeric' | '2-digit'

export type CalendarDateSegmentTypeEditable = Exclude<
	CalendarDateSegmentType,
	'literal'
>

export type CalendarDateSegment = {
	type: CalendarDateSegmentType
	value: string
}

export type CalendarDateSegmentExclude<T extends CalendarDateSegmentType> = {
	type: Exclude<CalendarDateSegmentType, T>
	value: string
}

export type CalendarDateMutation = {
	year?: number
	month?: number
	day?: number
}

export class CalendarDate {
	date: Date
	locale: string

	constructor(locale?: string, date?: Date) {
		this.date = date ?? new Date()
		this.locale = locale ?? navigator.language
	}

	static isValidSegment(segment: object): segment is CalendarDateSegment {
		return (
			'type' in segment &&
			calendarDateSegmentTypes.includes(
				segment.type as CalendarDateSegmentType
			)
		)
	}

	set({ year, month, day }: CalendarDateMutation) {
		const date = this.getDate()

		date.setFullYear(year ?? date.getFullYear())
		date.setMonth(month ? month - 1 : date.getMonth())
		date.setDate(day ?? date.getDate())

		return new CalendarDate(this.locale, date)
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

		date.setFullYear(date.getFullYear() + year)
		date.setMonth(date.getMonth() + month)
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
		segment: CalendarDateSegmentTypeEditable,
		options?: Intl.RelativeTimeFormatOptions
	) {
		const diff = this.getDiff(target)
		const segmentDiff = diff[segment]

		return new Intl.RelativeTimeFormat(this.locale, options).format(
			segmentDiff,
			segment
		)
	}

	get(segment: CalendarDateSegmentTypeEditable) {
		return this[`get${capitalize(segment)}`]()
	}

	getYear() {
		return this.getDate().getFullYear()
	}

	getMonth() {
		// Normalize index of date
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

	getSegments(style: CalendarDateSegmentStyle = 'numeric') {
		return new Intl.DateTimeFormat(this.locale, {
			year: 'numeric',
			month: style,
			day: style
		})
			.formatToParts(this.getDate())
			.reduce<CalendarDateSegment[]>((acc, part) => {
				if (CalendarDate.isValidSegment(part)) {
					acc.push(part)
				}

				return acc
			}, [])
	}

	getSegment(
		type: CalendarDateSegmentType,
		style?: CalendarDateSegmentStyle
	) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return this.getSegments(style).find((segment) => segment.type === type)!
	}

	getSegmentByIndex(index: number, style?: CalendarDateSegmentStyle) {
		return this.getSegments(style)[index]
	}

	getFirstDateOfWeek() {
		return this.sub({ day: this.getWeekDay() - 1 })
	}

	getFirstDateOfMonth() {
		return this.set({ day: 1 })
	}

	getLastDateOfWeek() {
		return this.getFirstDateOfWeek().add({ day: 7 })
	}

	getLastDateOfMonth() {
		return this.set({ month: this.getMonth() + 1, day: 0 })
	}

	// eslint-disable-next-line
	getWeek() {
		throw new Error('Not implemented')
	}

	getWeekDay() {
		const firstDayOfWeek = (() => {
			try {
				// @ts-expect-error not in spec yet
				// eslint-disable-next-line
				return new Intl.Locale(this.locale).getWeekInfo()
					.firstDay as number
			} catch (error) {
				if (
					this.locale.toLowerCase() === 'en' ||
					this.locale.toLowerCase() === 'en-US'
				) {
					return 7
				}

				return 1
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
		const weekDay = this.getWeekDay()
		const weekendDaysInfo = (() => {
			try {
				// @ts-expect-error not in spec yet
				// eslint-disable-next-line
				return new Intl.Locale(this.locale).getWeekInfo()
					.weekendInfo as number[]
			} catch (error) {
				// Find a way to polyfill this
				if (
					this.locale.toLowerCase() === 'en' ||
					this.locale.toLowerCase() === 'en-US'
				) {
					return [1, 7]
				}

				return [6, 7]
			}
		})()

		return weekendDaysInfo.includes(weekDay)
	}

	isAfter(date: CalendarDate) {
		return this.getDate() > date.getDate()
	}

	isBefore(date: CalendarDate) {
		return this.getDate() < date.getDate()
	}

	isSameDay(date: CalendarDate) {
		return (
			this.isSameYear(date) &&
			this.isSameMonth(date) &&
			this.getDay() === date.getDay()
		)
	}

	isSameMonth(date: CalendarDate) {
		return this.isSameYear(date) && this.getMonth() === date.getMonth()
	}

	isSameYear(date: CalendarDate) {
		return this.getYear() === date.getYear()
	}
}
