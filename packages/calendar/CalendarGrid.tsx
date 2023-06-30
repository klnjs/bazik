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
			const dates: CalendarDate[] = []
			const first = state.dateVisible.getFirstDateOfMonth()
			const last = state.dateVisible.getLastDateOfMonth()
			const end = last.calc({ day: 7 - last.getDayOfWeek() })
			let date = first.calc({ day: first.getDayOfWeek() })

			console.log(date)

			while (!date.isEquals(end)) {
				dates.push(date)
				date = date.calc({ day: 1 })
			}

			console.log(dates)

			return dates
		}, [state.dateVisible])

		return (
			<freya.div ref={forwardedRef} {...componentProps}>
				{visibleDates.map(children)}
			</freya.div>
		)
	}
)
