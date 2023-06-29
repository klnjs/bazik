import { freya, forwardRef, type AsChildComponentProps } from '../core'

export type CalendarContentProps = AsChildComponentProps<'div'>

export const CalendarContent = forwardRef<'div', CalendarContentProps>(
	(props, forwardedRef) => <freya.div ref={forwardedRef} {...props} />
)
