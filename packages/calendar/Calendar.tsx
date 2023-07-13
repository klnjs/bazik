import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { CalendarProvider } from './CalendarContext'
import { useCalendar, type UseCalendarOptions } from './useCalendar'

export type CalendarProps = AsChildComponentProps<'div', UseCalendarOptions>

export const Calendar = forwardRef<'div', CalendarProps>(
	(
		{ min, max, value, locale, defaultValue, onChange, ...otherProps },
		forwardedRef
	) => {
		const calendar = useCalendar({
			min,
			max,
			value,
			locale,
			defaultValue,
			onChange
		})

		return (
			<CalendarProvider value={calendar}>
				<freya.div ref={forwardedRef} role='group' {...otherProps} />
			</CalendarProvider>
		)
	}
)
