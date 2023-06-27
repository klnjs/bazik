export const isDateEqual = (date: Date, compare: Date) =>
	date.getFullYear() === compare.getFullYear() &&
	date.getMonth() === compare.getMonth() &&
	date.getDate() === compare.getDate()

export const isDateAfter = (date: Date, compare: Date) => date > compare

export const isDateBefore = (date: Date, compare: Date) => date < compare

export const isDateValid = (date: Date) =>
	date instanceof Date && !Number.isNaN(date.getTime())

export type DateParts = {
	year?: number
	month?: number
	day?: number
	hours?: number
	minutes?: number
	seconds?: number
	milliseconds?: number
}

export const cloneDate = (date: Date, options: DateParts = {}) => {
	const clonedDate = new Date(date)

	if (options.year !== undefined) {
		clonedDate.setFullYear(options.year)
	}

	if (options.month !== undefined) {
		clonedDate.setMonth(options.month)
	}

	if (options.day !== undefined) {
		clonedDate.setDate(options.day)
	}

	if (options.hours !== undefined) {
		clonedDate.setHours(options.hours)
	}

	if (options.minutes !== undefined) {
		clonedDate.setMinutes(options.minutes)
	}

	if (options.seconds !== undefined) {
		clonedDate.setSeconds(options.seconds)
	}

	if (options.milliseconds !== undefined) {
		clonedDate.setMilliseconds(options.milliseconds)
	}

	return clonedDate
}

export const getToday = (options?: DateParts) => cloneDate(new Date(), options)

export const getDaysInMonth = (date: Date) =>
	cloneDate(date, { day: 0 }).getDate()
