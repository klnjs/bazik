import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { useCalendarFieldContext } from './CalendarFieldContext'

export type CalendarFieldInputProps = AsChildComponentProps<'div'>

export const CalendarFieldInput = forwardRef<'div', CalendarFieldInputProps>(
	(props, forwardedRef) => {
		const { disabled } = useCalendarFieldContext()

		return (
			<freya.div
				ref={forwardedRef}
				data-disabled={disabled ? '' : undefined}
				{...props}
			/>
		)
	}
)
