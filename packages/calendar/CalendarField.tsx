import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { mergeProps } from '../core/mergeProps'
import { splitProps } from '../core/splitProps'
import { CalendarFieldProvider } from './CalendarFieldContext'
import {
	useCalendarField,
	type UseCalendarFieldOptions
} from './useCalendarField'

export type CalendarFieldProps = AsChildComponentProps<
	'div',
	UseCalendarFieldOptions
>

export const CalendarField = forwardRef<'div', CalendarFieldProps>(
	(props, forwardedRef) => {
		const [localProps, componentProps] = splitProps(props, [
			'min',
			'max',
			'value',
			'defaultValue',
			'onChange'
		])

		const calendarField = useCalendarField(localProps)
		const mergedProps = mergeProps(componentProps, calendarField.rootProps)

		return (
			<CalendarFieldProvider value={calendarField}>
				<freya.div ref={forwardedRef} {...mergedProps} />
			</CalendarFieldProvider>
		)
	}
)
