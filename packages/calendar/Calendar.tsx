import {
	forwardRef,
	type ForwardedRef,
	type Ref,
	type ReactElement
} from 'react'
import { freya, type CoreProps } from '../core'
import { CalendarProvider } from './CalendarContext'
// import { useCalendarFieldContext } from './CalendarFieldContext'
import { useCalendar, type UseCalendarOptions } from './useCalendar'

export type CalendarProps<R extends boolean = false> = CoreProps<
	'div',
	UseCalendarOptions<R>
>

export const Calendar = forwardRef(
	<R extends boolean = false>(
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
		}: CalendarProps<R>,
		forwardedRef: ForwardedRef<HTMLDivElement>
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
					role='application'
					aria-labelledby={calendar.titleId}
					{...otherProps}
				/>
			</CalendarProvider>
		)
	}
) as <M extends boolean = false>(
	props: CalendarProps<M> & { ref?: Ref<HTMLDivElement> }
) => ReactElement
