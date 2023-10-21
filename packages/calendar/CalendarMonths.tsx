import { useMemo, type ReactNode } from 'react'
import { useCalendarContext } from './CalendarContext'

export type CalendarMonthsItems = {
	key: string
	year: number
	month: number
}

export type CalendarMonthsProps = {
	children: (item: CalendarMonthsItems, index: number) => ReactNode
}

export const CalendarMonths = ({ children }: CalendarMonthsProps) => {
	const { months: monthsContext } = useCalendarContext()

	const months = useMemo(
		() =>
			monthsContext.map((month) => ({
				key: month.toString(),
				year: month.year,
				month: month.month
			})),

		[monthsContext]
	)

	return months.map(children)
}
