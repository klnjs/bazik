export type CalendarDateProps = {
	year?: number
	month?: number
	day?: number
}

export type CalendarDateSegment = keyof CalendarDateProps

export class CalendarDate {
	year?: number
	month?: number
	day?: number

	clone({ year, month, day }: CalendarDateProps = {}) {
		const cloned = new CalendarDate()

		cloned.setSegment('year', year ?? this.year)
		cloned.setSegment('month', month ?? this.month)
		cloned.setSegment('day', day ?? this.day)

		return cloned
	}

	add({ year = 0, month = 0, day = 0 }: CalendarDateProps = {}) {
		const date = this.asDate() ?? new Date()

		date.setFullYear(date.getFullYear() + year)
		date.setMonth(date.getMonth() + month)
		date.setDate(date.getDate() + day)

		return CalendarDate.fromDate(date)
	}

	subtract({ year = 0, month = 0, day = 0 }: CalendarDateProps = {}) {
		const date = this.asDate() ?? new Date()

		date.setFullYear(date.getFullYear() - year)
		date.setMonth(date.getMonth() - month)
		date.setDate(date.getDate() - day)

		return CalendarDate.fromDate(date)
	}

	setSegment(segment: CalendarDateSegment, value: number | undefined) {
		this[segment] = value

		if (this.day !== undefined) {
			this.day = Math.min(this.day, this.getDaysInMonth())
		}
	}

	getSegment(segment: CalendarDateSegment) {
		return this[segment]
	}

	getDayOfWeek() {
		return this.asDate()?.getDay()
	}

	getDaysInMonth() {
		if (!this.isValid()) {
			return 31
		}

		return new Date(this.year, this.month, 0).getDate()
	}

	asDate() {
		if (!this.isValid()) {
			return undefined
		}

		return new Date(this.year, this.month - 1, this.day)
	}

	toLocaleString(
		locales?: Intl.LocalesArgument,
		options?: Intl.DateTimeFormatOptions
	) {
		return this.asDate()?.toLocaleString(locales, options)
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

	static fromDate(date: Date | undefined) {
		if (date === undefined) {
			return new CalendarDate()
		}

		const result = new CalendarDate()

		result.setSegment('year', date.getFullYear())
		result.setSegment('month', date.getMonth() + 1)
		result.setSegment('day', date.getDate())

		return result
	}

	static fromToday() {
		return CalendarDate.fromDate(new Date())
	}
}
