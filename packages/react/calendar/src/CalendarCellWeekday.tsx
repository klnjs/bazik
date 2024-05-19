import { poly, type PolyProps } from '@klnjs/core'
import { useCalendarContext } from './CalendarContext'
import type { CalendarCellProps } from './CalendarCell'

export type CalendarCellWeekdayProps = PolyProps<'div', CalendarCellProps>

export const CalendarCellWeekday = ({
	type,
	date,
	children,
	...otherProps
}: CalendarCellWeekdayProps) => {
	const { calendar, locale } = useCalendarContext()

	const title = date.toLocaleString(locale, {
		calendar,
		weekday: 'long'
	})

	const content =
		children ?? date.toLocaleString(locale, { calendar, weekday: 'short' })

	return (
		<poly.abbr data-cell="weekday" title={title} {...otherProps}>
			{content}
		</poly.abbr>
	)
}
