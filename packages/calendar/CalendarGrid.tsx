import { useMemo, type ReactNode } from 'react'
import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { useCalendarFieldContext } from './CalendarFieldContext'
import type { CalendarFieldDate } from './CalendarFieldDate'
import { splitProps } from '../core/splitProps'

export type CalendarGridProps = AsChildComponentProps<
	'div',
	{ children: (day: CalendarFieldDate) => ReactNode }
>

export const CalendarGrid = forwardRef<'div', CalendarGridProps>(
	(props, forwardedRef) => {
		const context = useCalendarFieldContext()
		const [{ children }, componentProps] = splitProps(props, ['children'])

		const visibleDays = useMemo(() => {
			const visible = context.state.dateVisible
			const days: CalendarFieldDate[] = []
			const dayCount = visible.getDaysInMonth() ?? 31

			for (let day = 1; day <= dayCount; day++) {
				days.push(context.state.dateVisible.clone({ day }))
			}

			return days
		}, [])

		return (
			<freya.div ref={forwardedRef} {...componentProps}>
				{visibleDays.map(children)}
			</freya.div>
		)
	}
)
