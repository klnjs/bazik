import type { ReactNode } from 'react'
import { poly, forwardRef, type CoreProps } from '@klnjs/core'
import type { CalendarCellProps } from './CalendarCell'
import { useCalendarContext } from './CalendarContext'
import { CalendarGridProvider } from './CalendarGridContext'
import { useCalendarGrid } from './useCalendarGrid'
import type { CalendarVisibleDuration } from './CalendarTypes'

export type CalendarGridProps = CoreProps<
	'div',
	{
		offset?: CalendarVisibleDuration
		weekdays?: boolean
		weeks?: boolean
		children: (props: CalendarCellProps, index: number) => ReactNode
	}
>

export const CalendarGrid = forwardRef<'div', CalendarGridProps>(
	({ offset, weekdays, weeks, children, ...otherProps }, forwardedRef) => {
		const { locale, visibleRange } = useCalendarContext()

		const months = offset?.months ?? 0
		const month = visibleRange[0].add({ months }).toPlainYearMonth()
		const cells = useCalendarGrid({
			month,
			locale,
			weeks,
			weekdays
		})

		return (
			<CalendarGridProvider value={{ month, weeks, weekdays }}>
				<poly.div ref={forwardedRef} {...otherProps}>
					{cells.map(children)}
				</poly.div>
			</CalendarGridProvider>
		)
	}
)
