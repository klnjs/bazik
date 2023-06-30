import {
	freya,
	forwardRef,
	splitProps,
	type AsChildComponentProps
} from '../core'
import { CalendarProvider } from './CalendarContext'
import { useCalendar, type UseCalendarOptions } from './useCalendar'

export type CalendarProps = AsChildComponentProps<'div', UseCalendarOptions>

export const Calendar = forwardRef<'div', CalendarProps>(
	(props, forwardedRef) => {
		const [localProps, otherProps] = splitProps(props, [
			'min',
			'max',
			'value',
			'locale',
			'defaultValue',
			'onChange'
		])

		const calendar = useCalendar(localProps)

		return (
			<CalendarProvider value={calendar}>
				<freya.div ref={forwardedRef} role='group' {...otherProps} />
			</CalendarProvider>
		)
	}
)
