import { freya, forwardRef, type CoreProps } from '../core'

export type CalendarGridProps = CoreProps<'div'>

export const CalendarGrid = forwardRef<'div', CalendarGridProps>(
	(props, forwardedRef) => <freya.div ref={forwardedRef} {...props} />
)
