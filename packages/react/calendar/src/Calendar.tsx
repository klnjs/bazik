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
			months,
			readOnly,
			select = 'one',
			value,
			onBlur: onFocusLeave,
			onFocus: onFocusEnter,
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
			months,
			select,
			readOnly,
			value,
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
