import { poly, forwardRef, type CoreProps } from '@klnjs/core'
import type { CalendarCellProps } from './CalendarCell'

export type CalendarCellBlankProps = CoreProps<'div', CalendarCellProps>

export const CalendarCellBlank = forwardRef<'div', CalendarCellBlankProps>(
	({ type, date, children, ...otherProps }, forwardedRef) => (
		<poly.div ref={forwardedRef} data-cell="blank" {...otherProps}>
			{children}
		</poly.div>
	)
)
