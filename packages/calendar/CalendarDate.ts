export type CalendarDateProps = {
	year?: number
	month?: number
	day?: number
}

export type CalendarDateSegment = keyof CalendarDateProps

export class CalendarDate {
	year?: number
	static yearMin = 1
	static yearMax = 9999

	month?: number
	static monthMin = 1
	static monthMax = 12

	day?: number
	static dayMin = 1
	static dayMax = 31

	static fromDate(date: Date | undefined) {
		if (date === undefined) {
			return new CalendarDate()
		}

		return new CalendarDate({
			year: date.getFullYear(),
			month: date.getMonth() + 1,
			day: date.getDate()
		})
	}

	static fromToday() {
		return CalendarDate.fromDate(new Date())
	}

	constructor({ year, month, day }: CalendarDateProps = {}) {
		this.set('year', year)
		this.set('month', month)
		this.set('day', day)
	}

	get(segment: CalendarDateSegment) {
		return this[segment]
	}

	set(segment: CalendarDateSegment, value: number | undefined) {
		this[segment] =
			value !== undefined
				? Math.min(
						Math.max(value, CalendarDate[`${segment}Min`]),
						CalendarDate[`${segment}Max`]
				  )
				: undefined

		if (this.day !== undefined) {
			this.day = Math.min(this.day, this.getDaysInMonth())
		}
	}

	add(props: CalendarDateProps) {
		return this.calc(props)
	}

	sub(props: CalendarDateProps) {
		return this.calc(
			Object.fromEntries(
				Object.entries(props).map(([key, value = 0]) => [
					key,
					value * -1
				])
			)
		)
	}

	calc({ year = 0, month = 0, day = 0 }: CalendarDateProps = {}) {
		const date = this.asDate()

		date.setFullYear(date.getFullYear() + year)
		date.setMonth(date.getMonth() + month)
		date.setDate(date.getDate() + day)

		return CalendarDate.fromDate(date)
	}

	clone({
		year = this.year,
		month = this.month,
		day = this.day
	}: CalendarDateProps = {}) {
		return new CalendarDate({ year, month, day })
	}

	format(
		locales?: Intl.LocalesArgument,
		options?: Intl.DateTimeFormatOptions
	) {
		return this.asDate().toLocaleString(locales, options)
	}

	getFirstDateOfWeek(locale: string) {
		return this.sub({ day: this.getWeekDay(locale) - 1 })
	}

	getLastDateOfWeek(locale: string) {
		return this.getFirstDateOfWeek(locale).add({ day: 7 })
	}

	getFirstDateOfMonth() {
		return this.clone({ day: CalendarDate.dayMin })
	}

	getLastDateOfMonth() {
		return this.clone({ day: this.getDaysInMonth() })
	}

	getDaysInMonth() {
		return new Date(this.year, this.month, 0).getDate()
	}

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

		const dayOfWeek = this.asDate().getDay() || 7
		const dayOfWeekLocalized = 7 + dayOfWeek + 1 - firstDayOfWeek

		if (dayOfWeekLocalized > 7) {
			return dayOfWeekLocalized - 7
		}

		return dayOfWeekLocalized
	}

	asDate() {
		return new Date(this.year, this.month - 1, this.day)
	}

	isValid(): this is Required<CalendarDateProps> {
		return (
			this.year !== undefined &&
			this.month !== undefined &&
			this.day !== undefined
		)
	}

	isToday() {
		const today = CalendarDate.fromToday()

		return (
			this.year === today.year &&
			this.month === today.month &&
			this.day === today.day
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
		const thisNative = this.asDate()
		const dateNative = date.asDate()

		return thisNative > dateNative
	}

	isBefore(date: CalendarDate) {
		const thisNative = this.asDate()
		const dateNative = date.asDate()

		return thisNative < dateNative
	}

	isEquals(
		date: CalendarDate,
		segments: CalendarDateSegment[] = ['year', 'month', 'day']
	) {
		return segments.every(
			(segment) => this.get(segment) === date.get(segment)
		)
	}
}

const d1 = new CalendarDate({ year: 2023, month: 6, day: 26 })
const d2 = new CalendarDate({ year: 2023, month: 6, day: 27 })
const d3 = new CalendarDate({ year: 2023, month: 6, day: 28 })
const d4 = new CalendarDate({ year: 2023, month: 6, day: 29 })
const d5 = new CalendarDate({ year: 2023, month: 6, day: 30 })
const d6 = new CalendarDate({ year: 2023, month: 7, day: 1 })
const d7 = new CalendarDate({ year: 2023, month: 7, day: 2 })

console.log(
	d1.format('en', { weekday: 'long' }),
	d1.getWeekDay('da'),
	d1.getWeekDay('en'),
	'Should be [1, 2]'
)
console.log(
	d2.format('en', { weekday: 'long' }),
	d2.getWeekDay('da'),
	d2.getWeekDay('en'),
	'Should be [2, 3]'
)
console.log(
	d3.format('en', { weekday: 'long' }),
	d3.getWeekDay('da'),
	d3.getWeekDay('en'),
	'Should be [3, 4]'
)
console.log(
	d4.format('en', { weekday: 'long' }),
	d4.getWeekDay('da'),
	d4.getWeekDay('en'),
	'Should be [4, 5]'
)
console.log(
	d5.format('en', { weekday: 'long' }),
	d5.getWeekDay('da'),
	d5.getWeekDay('en'),
	'Should be [5, 6]'
)
console.log(
	d6.format('en', { weekday: 'long' }),
	d6.getWeekDay('da'),
	d6.getWeekDay('en'),
	'Should be [6, 7]'
)
console.log(
	d7.format('en', { weekday: 'long' }),
	d7.getWeekDay('da'),
	d7.getWeekDay('en'),
	'Should be [7, 1]'
)
