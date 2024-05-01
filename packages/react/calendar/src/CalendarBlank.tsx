import { poly, forwardRef, type CoreProps } from '@klnjs/core'
import type { PlainDate } from './CalendarTypes'

export type CalendarBlankProps = CoreProps<'div', { date: PlainDate }>

export const CalendarBlank = forwardRef<'div', CalendarBlankProps>(
	({ date, children, ...otherProps }, forwardedRef) => (
		<poly.div ref={forwardedRef} aria-hidden={true} {...otherProps}>
			{children}
		</poly.div>
	)
)
