import type { ReactElement, Ref } from 'react'
import { freya, forwardRef, type CoreProps, type Assign } from '../core'
import { useFocusWithin } from '../focus/useFocusWithin'
import { CalendarProvider } from './CalendarContext2'
import type { CalendarDate } from './CalendarDate'
import {
	useCalendar,
	type CalendarSelect,
	type UseCalendarOptions
} from './useCalendar2'

export type CalendarProps<S extends CalendarSelect = 'single'> = CoreProps<
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
			readOnly,
			select = 'single',
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
			select,
			readOnly,
			value,
			onChange
		})

		const focusProps = useFocusWithin({
			onFocusEnter,
			onFocusLeave,
			onFocusChange: (update) => calendar.setFocusWithin(update)
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
) as <S extends CalendarSelect = 'single'>(
	props: Assign<
		CalendarProps,
		{
			select?: S
			value?:
				| null
				| (S extends 'single'
						? CalendarDate
						: S extends 'multiple'
						? CalendarDate[]
						: S extends 'range'
						? [CalendarDate, CalendarDate]
						: never)
			defaultValue?:
				| null
				| (S extends 'single'
						? CalendarDate
						: S extends 'multiple'
						? CalendarDate[]
						: S extends 'range'
						? [CalendarDate, CalendarDate]
						: never)
			onChange?: (
				value:
					| null
					| (S extends 'single'
							? CalendarDate
							: S extends 'multiple'
							? CalendarDate[]
							: S extends 'range'
							? [CalendarDate, CalendarDate]
							: never)
			) => void
			ref?: Ref<HTMLDivElement>
		}
	>
) => ReactElement
