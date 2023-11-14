import { freya, forwardRef, type CoreProps } from '../core'
import type { PlainDate } from './CalendarTypes'

export type CalendarBlankProps = CoreProps<'div', { date: PlainDate }>

export const CalendarBlank = forwardRef<'div', CalendarBlankProps>(
	({ date, children, ...otherProps }, forwardedRef) => (
		<freya.div ref={forwardedRef} aria-hidden={true} {...otherProps}>
			{children}
		</freya.div>
	)
)
