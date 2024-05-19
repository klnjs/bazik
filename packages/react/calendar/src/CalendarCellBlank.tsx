import { poly, type PolyProps } from '@klnjs/core'
import type { CalendarCellProps } from './CalendarCell'

export type CalendarCellBlankProps = PolyProps<'div', CalendarCellProps>

export const CalendarCellBlank = ({
	type,
	date,
	children,
	...otherProps
}: CalendarCellBlankProps) => (
	<poly.div data-cell="blank" {...otherProps}>
		{children}
	</poly.div>
)
