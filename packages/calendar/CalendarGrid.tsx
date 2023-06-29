import { useMemo, type ReactNode } from 'react'
import {
	freya,
	forwardRef,
	splitProps,
	type AsChildComponentProps
} from '../core'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDate } from './CalendarDate'

export type CalendarGridProps = AsChildComponentProps<
	'div',
	{ children: (day: CalendarDate) => ReactNode }
>

export const CalendarGrid = forwardRef<'div', CalendarGridProps>(
	(props, forwardedRef) => {
		const [{ children }, componentProps] = splitProps(props, ['children'])
		const { state } = useCalendarContext()

		const visibleDates = useMemo(() => {
			const visible = state.dateVisible
			const visibleHead = visible.clone({ day: 0 })
			const visibleTail = visible.clone({ day: visible.getDaysInMonth() })

			const rangeHead = visibleHead.subtract({
				day: visibleHead.getDayOfWeek()
			})

			const rangeTail = visibleTail.add({
				day: 7 - visibleTail.getDayOfWeek()
			})

			let date = rangeHead
			const dates: CalendarDate[] = []

			while (!date.isEquals(rangeTail)) {
				dates.push(date)
				date = date.add({ day: 1 })
			}

			return dates
		}, [state.dateVisible])

		return (
			<freya.div ref={forwardedRef} {...componentProps}>
				{visibleDates.map(children)}
			</freya.div>
		)
	}
)
