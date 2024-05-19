import { poly, forwardRef, type CoreProps } from '@klnjs/core'

export type CalendarGroupProps = CoreProps<'div'>

export const CalendarGroup = forwardRef<'div', CalendarGroupProps>(
	(props, forwardedRef) => <poly.div ref={forwardedRef} {...props} />
)
