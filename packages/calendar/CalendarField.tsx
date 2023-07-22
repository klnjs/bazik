import { freya, forwardRef, type AsChildComponentProps } from '../core'
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
	(
		{
			autoFocus,
			min,
			max,
			value,
			locale,
			disabled,
			defaultOpen,
			defaultValue,
			onChange,
			...otherProps
		},
		forwardedRef
	) => {
		const field = useCalendarField({
			autoFocus,
			min,
			max,
			value,
			locale,
			disabled,
			defaultOpen,
			defaultValue,
			onChange
		})

		return (
			<CalendarFieldProvider value={field}>
				<freya.div ref={forwardedRef} role='group' {...otherProps} />
			</CalendarFieldProvider>
		)
	}
)
