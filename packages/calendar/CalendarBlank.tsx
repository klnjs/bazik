import type { Temporal } from 'temporal-polyfill'
import { freya, forwardRef, type CoreProps } from '../core'

export type CalendarBlankProps = CoreProps<'div', { date: Temporal.PlainDate }>

export const CalendarBlank = forwardRef<'div', CalendarBlankProps>(
	({ date, children, ...otherProps }, forwardedRef) => (
		<freya.div ref={forwardedRef} aria-hidden={true} {...otherProps}>
			{children}
		</freya.div>
	)
)
