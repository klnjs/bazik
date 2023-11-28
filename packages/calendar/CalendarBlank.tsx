import { freya, forwardRef, type CoreProps } from '../core'
import type { Date } from './calendar-types'

export type CalendarBlankProps = CoreProps<'div', { date: Date }>

export const CalendarBlank = forwardRef<'div', CalendarBlankProps>(
	({ date, children, ...otherProps }, forwardedRef) => (
		<freya.div ref={forwardedRef} aria-hidden={true} {...otherProps}>
			{children}
		</freya.div>
	)
)
