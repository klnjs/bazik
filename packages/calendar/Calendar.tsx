import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { CalendarProvider } from './CalendarContext'
import { useCalendarFieldContext } from './CalendarFieldContext'
import { useCalendar, type UseCalendarOptions } from './useCalendar'

export type CalendarProps = AsChildComponentProps<'div', UseCalendarOptions>

export const Calendar = forwardRef<'div', CalendarProps>(
	(
		{
			autoFocus,
			min,
			max,
			value,
			locale,
			disabled,
			defaultValue,
			defaultFocused,
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
			value,
			locale,
			disabled,
			defaultValue,
			defaultFocused,
			onChange
		})

		return (
			<CalendarProvider value={{ ...calendar, ...field }}>
				<freya.div
					ref={forwardedRef}
					role='application'
					{...otherProps}
				/>
			</CalendarProvider>
		)
	}
)
