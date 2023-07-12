import { useMemo, type ReactNode } from 'react'
import { freya, forwardRef, splitProps, type ComponentProps } from '../core'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDate } from './CalendarDate'

export type CalendarGridProps = ComponentProps<
	'div',
	{ children: (day: CalendarDate, index: number) => ReactNode }
>

export const CalendarGrid = forwardRef<'div', CalendarGridProps>(
	(props, forwardedRef) => {
		const { state, config } = useCalendarContext()
		const [{ children }, otherProps] = splitProps(props, ['children'])

		const visibleDates = useMemo(() => {
			const dates: CalendarDate[] = []

			const max = state.dateVisible
				.getLastDateOfMonth()
				.getLastDateOfWeek(config.locale)

			let date = state.dateVisible
				.getFirstDateOfMonth()
				.getFirstDateOfWeek(config.locale)

			while (!date.isEquals(max)) {
				dates.push(date)
				date = date.add({ day: 1 })
			}

			return dates
		}, [state.dateVisible, config.locale])

		return (
			<freya.div ref={forwardedRef} {...otherProps}>
				{visibleDates.map(children)}
			</freya.div>
		)
	}
)
