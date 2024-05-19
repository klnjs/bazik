import { poly, type PolyProps } from '@klnjs/core'
import { plainDate } from '@klnjs/temporal'
import { useCalendarContext } from './CalendarContext'
import type { CalendarCellProps } from './CalendarCell'

export type CalendarCellWeekProps = PolyProps<'div', CalendarCellProps>

export const CalendarCellWeek = ({
	type,
	date,
	children,
	...otherProps
}: CalendarCellWeekProps) => {
	const { locale } = useCalendarContext()

	const content = children ?? plainDate.getWeekOfYear(date, locale)

	return (
		<poly.div data-cell="week" {...otherProps}>
			{content}
		</poly.div>
	)
}
