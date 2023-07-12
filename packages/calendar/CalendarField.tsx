import { freya, forwardRef, type AsChildComponentProps } from '../core'

export type CalendarFieldProps = AsChildComponentProps<'div'>

export const CalendarField = forwardRef<'div', CalendarFieldProps>(
	(props, forwardedRef) => (
		<freya.div ref={forwardedRef} role='group' {...props} />
	)
)
