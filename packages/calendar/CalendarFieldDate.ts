export type CalendarFieldDateOptions = {
	year?: number
	month?: number
	day?: number
}

export type CalendarFieldDateSegment = keyof CalendarFieldDateOptions

export class CalendarFieldDate {
	year?: number
	month?: number
	day?: number

	clone(mutation: CalendarFieldDateOptions = {}) {
		const cloned = new CalendarFieldDate()

		cloned.setSegment('year', mutation.year ?? this.year)
		cloned.setSegment('month', mutation.month ?? this.month)
		cloned.setSegment('day', mutation.day ?? this.day)

		return cloned
	}

	setSegment(segment: CalendarFieldDateSegment, value: number | undefined) {
		this[segment] = value

		if (this.day !== undefined) {
			this.day = Math.min(this.day, this.getDaysInMonth())
		}
	}

	getSegment(segment: CalendarFieldDateSegment) {
		return this[segment]
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

	isValid(): this is Required<CalendarFieldDateOptions> {
		return (
			this.year !== undefined &&
			this.month !== undefined &&
			this.day !== undefined
		)
	}

	isEquals(date: CalendarFieldDate) {
		return (
			this.year === date.year &&
			this.month === date.month &&
			this.day === date.day
		)
	}

	isBefore(date: CalendarFieldDate) {
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

	isAfter(date: CalendarFieldDate) {
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
			return new CalendarFieldDate()
		}

		const result = new CalendarFieldDate()

		result.setSegment('year', date.getFullYear())
		result.setSegment('month', date.getMonth() + 1)
		result.setSegment('day', date.getDate())

		return result
	}

	static fromToday() {
		return CalendarFieldDate.fromDate(new Date())
	}
}
