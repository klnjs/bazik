import type { ReactElement, Ref } from 'react'
import { freya, forwardRef, type CoreProps } from '../core'
import { useFocusWithin } from '../focus/useFocusWithin'
import { CalendarProvider } from './CalendarContext'
import {
	useCalendar,
	type CalendarSelect,
	type UseCalendarOptions
} from './useCalendar'

export type CalendarProps<S extends CalendarSelect = 'one'> = CoreProps<
	'div',
	UseCalendarOptions<S>
>

export const Calendar = forwardRef<'div', CalendarProps>(
	(
		{
			autoFocus,
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

		const focusProps = useFocusWithin({
			onFocusEnter,
			onFocusLeave,
			onFocusChange: (focusWithin) => calendar.setFocusWithin(focusWithin)
		})

		return (
			<CalendarProvider value={calendar}>
				<freya.div
					ref={forwardedRef}
					role="application"
					aria-readonly={readOnly}
					{...focusProps}
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
