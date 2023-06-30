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
			this.day = Math.min(
				this.day,
				this.getDaysInMonth() ?? CalendarDate.dayMax
			)
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
		const date = this.asDate() ?? new Date()

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
		return this.asDate()?.toLocaleString(locales, options)
	}

	getFirstDateOfMonth() {
		return this.clone({ day: 0 })
	}

	getLastDateOfMonth() {
		return this.clone({ day: this.getDaysInMonth() })
	}

	getDayOfWeek(locale: string) {
		if (!this.isValid()) {
			return undefined
		}

		const firstDay = new Date(this.year, this.month - 1, this.day).getDay()

		// @ts-expect-error not in spec yet
		// eslint-disable-next-line
		const firstDayWeek = new Intl.Locale(locale).weekInfo.firstDay as number
		const firstDayWeekNormalized = firstDayWeek === 7 ? 0 : firstDayWeek

		return firstDay - firstDayWeekNormalized
	}

	getDaysInMonth() {
		if (!this.isValid()) {
			return undefined
		}

		return new Date(this.year, this.month, 0).getDate()
	}

	getWeek() {
		if (!this.isValid()) {
			return undefined
		}

		const date = new Date(this.year, this.month - 1, this.day)
		date.setDate(date.getDate() + 4 - (date.getDay() || 7))

		const time = date.getTime()
		const year = date.getFullYear()
		const first = new Date(
			year,
			0,
			1 + (4 - new Date(year, 0, 1).getDay() || 7)
		)

		return Math.ceil(((time - first.getTime()) / 86400000 + 1) / 7)
	}

	asDate() {
		if (!this.isValid()) {
			return undefined
		}

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

	isEquals(date: CalendarDate) {
		return (
			this.year === date.year &&
			this.month === date.month &&
			this.day === date.day
		)
	}

	isBefore(date: CalendarDate) {
		if (this.year !== undefined && date.year !== undefined) {
			if (this.year < date.year) {
				return true
			} else if (this.year === date.year) {
				if (this.month !== undefined && date.month !== undefined) {
					if (this.month < date.month) {
						return true
					} else if (this.month === date.month) {
						if (this.day !== undefined && date.day !== undefined) {
							return this.day < date.day
						}
					}
				}
			}
		}

		return false
	}

	isAfter(date: CalendarDate) {
		if (this.year !== undefined && date.year !== undefined) {
			if (this.year > date.year) {
				return true
			} else if (this.year === date.year) {
				if (this.month !== undefined && date.month !== undefined) {
					if (this.month > date.month) {
						return true
					} else if (this.month === date.month) {
						if (this.day !== undefined && date.day !== undefined) {
							return this.day > date.day
						}
					}
				}
			}
		}

		return false
	}
}
