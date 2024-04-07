import { poly, forwardRef, type CoreProps } from '@klnjs/core'
import type { Date } from './calendar-types'

export type CalendarBlankProps = CoreProps<'div', { date: Date }>

export const CalendarBlank = forwardRef<'div', CalendarBlankProps>(
	({ date, children, ...otherProps }, forwardedRef) => (
		<poly.div ref={forwardedRef} aria-hidden={true} {...otherProps}>
			{children}
		</poly.div>
	)
)
