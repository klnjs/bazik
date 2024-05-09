import type { ReactElement, Ref } from 'react'
import { poly, forwardRef, type CoreProps } from '@klnjs/core'
import type { CalendarSelect } from './useCalendarSelection'
import { CalendarProvider } from './CalendarContext'
import { useCalendar, type UseCalendarOptions } from './useCalendar'

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
			pagination,
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
