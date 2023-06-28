import { useMemo, type ReactNode } from 'react'
import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { splitProps } from '../core/splitProps'
import { useCalendarFieldContext } from './CalendarFieldContext'
import type { CalendarFieldDate } from './CalendarFieldDate'

export type CalendarGridProps = AsChildComponentProps<
	'div',
	{ children: (day: CalendarFieldDate) => ReactNode }
>

export const CalendarGrid = forwardRef<'div', CalendarGridProps>(
	(props, forwardedRef) => {
		const [{ children }, componentProps] = splitProps(props, ['children'])
		const { state } = useCalendarFieldContext()

		const visibleDays = useMemo(() => {
			const visible = state.dateVisible
			const days: CalendarFieldDate[] = []
			const dayCount = visible.getDaysInMonth()

			for (let day = 1; day <= dayCount; day++) {
				days.push(state.dateVisible.clone({ day }))
			}

			return days
		}, [state])

		return (
			<freya.div ref={forwardedRef} {...componentProps}>
				{visibleDays.map(children)}
			</freya.div>
		)
	}
)
