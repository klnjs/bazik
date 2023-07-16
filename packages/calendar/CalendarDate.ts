import { capitalize } from '../core/capitalize'

export type CalendarDateSegment = 'year' | 'month' | 'day'

export type CalendarDateMutation = {
	year?: number
	month?: number
	day?: number
}

export class CalendarDate {
	date: Date

	constructor(date?: Date) {
		this.date = date ?? new Date()
	}

	add(props: CalendarDateMutation) {
		return this.calc(props)
	}

	sub(props: CalendarDateMutation) {
		return this.calc(
			Object.fromEntries(
				Object.entries(props).map(([key, value = 0]) => [
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

	clone({ year, month, day }: CalendarDateMutation = {}) {
		const date = this.getDate()

		date.setFullYear(year ?? date.getFullYear())
		date.setMonth(month ?? date.getMonth())
		date.setDate(day ?? date.getDay())

		return new CalendarDate(date)
	}

	format(locale: string, options?: Intl.DateTimeFormatOptions) {
		return this.getDate().toLocaleString(locale, options)
	}

	formatRelative(
		locale: string,
		target: CalendarDate,
		segment: CalendarDateSegment,
		options?: Intl.RelativeTimeFormatOptions
	) {
		const diff = this.getDiff(target)
		const segmentDiff = diff[segment]

		return new Intl.RelativeTimeFormat(locale, options).format(
			segmentDiff,
			segment
		)
	}

	getYear() {
		return this.getDate().getFullYear()
	}

	getMonth() {
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
		const oneDay = 1000 * 60 * 60 * 24 // Calculate the number of milliseconds in a day, month, and year
		const oneMonth = oneDay * 30.436875 // Average number of days in a month
		const oneYear = oneDay * 365.25 // Average number of days in a year

		return {
			year: Math.floor(difference / oneYear),
			month: Math.floor((difference % oneYear) / oneMonth),
			day: Math.floor(((difference % oneYear) % oneMonth) / oneDay)
		}
	}

	getSegment(segment: CalendarDateSegment) {
		return this[`get${capitalize(segment)}`]()
	}

	getSegmentByIndex(locale: string, index: number) {
		return this.getSegments(locale)[index]
	}

	getSegments(locale: string) {
		return new Intl.DateTimeFormat(locale)
			.formatToParts(this.getDate())
			.filter((part) => part.type !== 'literal')
			.map((part) => part.type) as CalendarDateSegment[]
	}

	getFirstDateOfWeek(locale: string) {
		return this.sub({ day: this.getWeekDay(locale) - 1 })
	}

	getLastDateOfWeek(locale: string) {
		return this.getFirstDateOfWeek(locale).add({ day: 7 })
	}

	getFirstDateOfMonth() {
		return this.clone({ day: 1 })
	}

	getLastDateOfMonth() {
		return this.clone({ month: this.getMonth(), day: 0 })
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
				// Find a way to polyfill this
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

	isEquals(
		date: CalendarDate,
		segments: CalendarDateSegment[] = ['year', 'month', 'day']
	) {
		return segments.every(
			(segment) => this.getSegment(segment) === date.getSegment(segment)
		)
	}
}
