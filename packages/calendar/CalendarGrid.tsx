import type { ReactNode } from 'react'
import { freya, forwardRef, type CoreProps } from '../core'
import type { CalendarCellProps } from './CalendarCell'
import { useCalendarContext } from './CalendarContext'
import { CalendarGridProvider } from './CalendarGridContext'
import { useCalendarGrid } from './useCalendarGrid'

export type CalendarGridProps = CoreProps<
	'div',
	{
		weeks?: boolean
		weekdays?: boolean
		monthOffset?: number
		children: (props: CalendarCellProps, index: number) => ReactNode
	}
>

export const CalendarGrid = forwardRef<'div', CalendarGridProps>(
	(
		{ weeks, weekdays, monthOffset = 0, children, ...otherProps },
		forwardedRef
	) => {
		const { locale, visibleRange } = useCalendarContext()
		const { year, month } = visibleRange[0].add({ months: monthOffset })
		const cells = useCalendarGrid({ year, month, weeks, weekdays, locale })

		return (
			<CalendarGridProvider value={{ year, month, weeks, weekdays }}>
				<freya.div ref={forwardedRef} {...otherProps}>
					{cells.map(children)}
				</freya.div>
			</CalendarGridProvider>
		)
	}
)
