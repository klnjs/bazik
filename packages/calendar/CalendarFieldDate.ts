/* eslint-disable no-underscore-dangle */

export type CalendarFieldDateOptions = {
	year?: number
	month?: number
	day?: number
}

export class CalendarFieldDate {
	private _year?: number
	private _month?: number
	private _day?: number

	constructor(options: CalendarFieldDateOptions = {}) {
		this._year = options.year
		this._month = options.month
		this._day = options.day
	}

	get year(): number | undefined {
		return this._year
	}

	set year(year: number | undefined) {
		this._year = year
	}

	get month(): number | undefined {
		return this._month
	}

	set month(month: number | undefined) {
		this._month = month
	}

	get day(): number | undefined {
		return this._day
	}

	set day(day: number | undefined) {
		this._day = day
	}

	clone(options: CalendarFieldDateOptions = {}) {
		return new CalendarFieldDate({
			year: options.year !== undefined ? options.year : this.year,
			month: options.month !== undefined ? options.month : this.month,
			day: options.day !== undefined ? options.day : this.day
		})
	}

	getDaysInMonth() {
		if (!this.isValid()) {
			return undefined
		}

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return new Date(this._year!, this._month!, this._day).getDate()
	}

	asDate() {
		if (!this.isValid()) {
			return undefined
		}

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return new Date(this._year!, this._month!, this._day)
	}

	isValid() {
		return (
			this._year !== undefined &&
			this._month !== undefined &&
			this._day !== undefined
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

		const year = date.getFullYear()
		const month = date.getMonth() + 1
		const day = date.getDate()

		return new CalendarFieldDate({ year, month, day })
	}

	static fromToday() {
		return CalendarFieldDate.fromDate(new Date())
	}
}
