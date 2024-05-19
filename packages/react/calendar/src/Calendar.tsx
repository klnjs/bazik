import type { ReactElement, Ref } from 'react'
import { poly, type PolyProps } from '@klnjs/core'
import { CalendarProvider } from './CalendarContext'
import { useCalendar, type UseCalendarOptions } from './useCalendar'
import type { CalendarSelect } from './useCalendarSelection'

export type CalendarProps<S extends CalendarSelect = 'one'> = PolyProps<
	'div',
	UseCalendarOptions<S>
>

export const Calendar = (
	(
		{
			ref: refProp,
			autoFocus,
			calendar: calendarProp,
			defaultValue,
			disabled,
			locale,
			max,
			min,
			pagination,
			readOnly,
			select,
			value,
			visibleDuration,
			onChange,
			...otherProps
		}: CalendarProps
	) => {
		const calendar = useCalendar({
			autoFocus,
			calendar: calendarProp,
			defaultValue,
			disabled,
			locale,
			max,
			min,
			pagination,
			readOnly,
			select,
			value,
			visibleDuration,
			onChange
		})

		return (
			<CalendarProvider value={calendar}>
				<poly.div
					ref={refProp}
					role="application"
					{...otherProps}
				/>
			</CalendarProvider>
		)
	}
) as <S extends CalendarSelect = 'one'>(
	props: CalendarProps<S> & {
		ref?: Ref<HTMLDivElement>
	}
) => ReactElement
