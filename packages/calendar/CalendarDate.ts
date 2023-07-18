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

export type CalendarDateMutation = {
	year?: number
	month?: number
	day?: number
}

export const isCalendarDateSegment = (
	segment: object
): segment is CalendarDateSegment =>
	'type' in segment &&
	calendarDateSegmentTypes.includes(segment.type as CalendarDateSegmentType)

export class CalendarDate {
	date: Date

	constructor(date?: Date) {
		this.date = date ?? new Date()
	}

	set({ year, month, day }: CalendarDateMutation) {
		const date = this.getDate()

		date.setFullYear(year ?? date.getFullYear())
		date.setMonth(month ? month - 1 : date.getMonth())
		date.setDate(day ?? date.getDate())

		return new CalendarDate(date)
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

		return new CalendarDate(date)
	}

	clone() {
		return new CalendarDate(this.getDate())
	}

	format(locale: string, options?: Intl.DateTimeFormatOptions) {
		return this.getDate().toLocaleString(locale, options)
	}

	formatRelative(
		locale: string,
		target: CalendarDate,
		segment: CalendarDateSegmentTypeEditable,
		options?: Intl.RelativeTimeFormatOptions
	) {
		const diff = this.getDiff(target)
		const segmentDiff = diff[segment]

		return new Intl.RelativeTimeFormat(locale, options).format(
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

	getSegments(locale: string, style: CalendarDateSegmentStyle = 'numeric') {
		return new Intl.DateTimeFormat(locale, {
			year: 'numeric',
			month: style,
			day: style
		})
			.formatToParts(this.getDate())
			.reduce<CalendarDateSegment[]>((acc, part) => {
				if (isCalendarDateSegment(part)) {
					acc.push(part)
				}

				return acc
			}, [])
	}

	getSegment(
		locale: string,
		type: CalendarDateSegmentType,
		style?: CalendarDateSegmentStyle
	) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return this.getSegments(locale, style).find(
			(segment) => segment.type === type
		)!
	}

	getSegmentByIndex(
		locale: string,
		index: number,
		style?: CalendarDateSegmentStyle
	) {
		return this.getSegments(locale, style)[index]
	}

	getFirstDateOfWeek(locale: string) {
		return this.sub({ day: this.getWeekDay(locale) - 1 })
	}

	getFirstDateOfMonth() {
		return this.set({ day: 1 })
	}

	getLastDateOfWeek(locale: string) {
		return this.getFirstDateOfWeek(locale).add({ day: 7 })
	}

	getLastDateOfMonth() {
		return this.set({ month: this.getMonth() + 1, day: 0 })
	}

	// eslint-disable-next-line
	getWeek() {
		throw new Error('Not implemented')
	}

	getWeekDay(locale: string) {
		const firstDayOfWeek = (() => {
			try {
				// @ts-expect-error not in spec yet
				// eslint-disable-next-line
				return new Intl.Locale(locale).getWeekInfo().firstDay as number
			} catch (error) {
				if (
					locale.toLowerCase() === 'en' ||
					locale.toLowerCase() === 'en-US'
				) {
					return 7
				}

				return 1
			}
		})()

		const dayOfWeek = this.getDate().getDay() || 7
		const dayOfWeekLocalized = dayOfWeek - firstDayOfWeek + 1

		if (dayOfWeekLocalized < 1) {
			return dayOfWeekLocalized + 7
		}

		return dayOfWeekLocalized
	}

	getDate() {
		return new Date(this.date)
	}

	isToday() {
		const today = new CalendarDate()

		return (
			this.getYear() === today.getYear() &&
			this.getMonth() === today.getMonth() &&
			this.getDay() === today.getDay()
		)
	}

	isWeekend(locale: string) {
		const weekDay = this.getWeekDay(locale)
		const weekendDaysInfo = (() => {
			try {
				// @ts-expect-error not in spec yet
				// eslint-disable-next-line
				return new Intl.Locale(locale).getWeekInfo()
					.weekendInfo as number[]
			} catch (error) {
				// Find a way to polyfill this
				if (
					locale.toLowerCase() === 'en' ||
					locale.toLowerCase() === 'en-US'
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

// const today = new CalendarDate()
// const todayLastDayOfMonth = today.getLastDateOfMonth()
// const todayLastDayOfWeek = todayLastDayOfMonth.getLastDateOfWeek('da')

// console.log(todayLastDayOfMonth)
// console.log(todayLastDayOfWeek)
