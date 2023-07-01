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
		const { state, config } = useCalendarContext()

		const visibleDates = useMemo(() => {
			const dates: CalendarDate[] = []
			const first = state.dateVisible.getFirstDateOfMonth()
			const last = state.dateVisible.getLastDateOfMonth()
			const end = last.add({ day: 7 - last.getDayOfWeek(config.locale) })
			let date = first.sub({
				day: first.getDayOfWeek(config.locale)
			})

			while (!date.isEquals(end)) {
				dates.push(date)
				date = date.calc({ day: 1 })
			}

			return dates
		}, [state.dateVisible, config.locale])

		return (
			<freya.div ref={forwardedRef} {...componentProps}>
				{visibleDates.map(children)}
			</freya.div>
		)
	}
)
