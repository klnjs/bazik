import type { Ref, ReactElement } from 'react'
import { freya, forwardRef, type CoreProps } from '../core'
import { CalendarProvider } from './CalendarContext'
// import { useCalendarFieldContext } from './CalendarFieldContext'
import { useCalendar, type UseCalendarOptions } from './useCalendar'

export type CalendarProps<R extends boolean = false> = CoreProps<
	'div',
	UseCalendarOptions<R>
>

export const Calendar = forwardRef<'div', CalendarProps<true | false>>(
	(
		{
			autoFocus,
			min,
			max,
			range,
			value,
			locale,
			disabled,
			defaultValue,
			onChange,
			...otherProps
		},
		forwardedRef
	) => {
		//const field = useCalendarFieldContext({ strict: false })
		const calendar = useCalendar({
			autoFocus,
			min,
			max,
			range,
			value,
			locale,
			disabled,
			defaultValue,
			onChange
		})

		return (
			<CalendarProvider value={{ ...calendar }}>
				<freya.div
					ref={forwardedRef}
					role="application"
					aria-labelledby={calendar.titleId}
					{...otherProps}
				/>
			</CalendarProvider>
		)
	}
) as <M extends boolean = false>(
	props: CalendarProps<M> & { ref?: Ref<HTMLDivElement> }
) => ReactElement
