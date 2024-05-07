import type { ReactElement, Ref } from 'react'
import { poly, forwardRef, type CoreProps } from '@klnjs/core'
import { CalendarProvider } from './CalendarContext'
import { useCalendar, type UseCalendarOptions } from './useCalendar'
import type { CalendarSelect } from './useCalendarSelection'

export type CalendarProps<S extends CalendarSelect = 'one'> = CoreProps<
	'div',
	UseCalendarOptions<S>
>

export const Calendar = forwardRef<'div', CalendarProps>(
	(
		{
			autoFocus,
			calendar: calendarProp,
			defaultValue,
			disabled,
			locale,
			max,
			min,
			readOnly,
			select = 'one',
			value,
			visibleDuration,
			onChange,
			...otherProps
		},
		forwardedRef
	) => {
		const calendar = useCalendar({
			autoFocus,
			calendar: calendarProp,
			defaultValue,
			disabled,
			locale,
			max,
			min,
			readOnly,
			select,
			value,
			visibleDuration,
			onChange
		})

		return (
			<CalendarProvider value={calendar}>
				<poly.div
					ref={forwardedRef}
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
