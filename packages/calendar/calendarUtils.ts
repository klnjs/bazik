export const getDaysInMonth = (year: number, month: number) =>
	new Date(year, month, 0).getDate()

export const getDateSegments = (
	date: Date
): [number, number, number, number, number] => [
	date.getFullYear(),
	date.getMonth() + 1,
	date.getDate(),
	date.getHours(),
	date.getMinutes()
]
