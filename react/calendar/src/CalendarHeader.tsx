import { poly, forwardRef, type CoreProps } from '@klnjs/core'

export type CalendarHeaderProps = CoreProps<'header'>

export const CalendarHeader = forwardRef<'header', CalendarHeaderProps>(
	(props, forwardedRef) => <poly.header ref={forwardedRef} {...props} />
)
