import { freya, forwardRef, type CoreProps } from '../core'

export type CalendarHeaderProps = CoreProps<'header'>

export const CalendarHeader = forwardRef<'header', CalendarHeaderProps>(
	(props, forwardedRef) => <freya.header ref={forwardedRef} {...props} />
)
