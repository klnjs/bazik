import { freya, forwardRef, type CoreProps } from '../core'
import { CalendarProvider } from './CalendarContext'
import { useCalendarFieldContext } from './CalendarFieldContext'
import { useCalendar, type UseCalendarOptions } from './useCalendar'

export type CalendarProps = CoreProps<'div', UseCalendarOptions>

export const Calendar = forwardRef<'div', CalendarProps>(
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
		const field = useCalendarFieldContext({ strict: false })
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
			<CalendarProvider value={{ ...calendar, ...field }}>
				<freya.div
					ref={forwardedRef}
					role="application"
					aria-labelledby={calendar.titleId}
					{...otherProps}
				/>
			</CalendarProvider>
		)
	}
)
