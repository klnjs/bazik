import { poly, type PolyProps } from '@klnjs/core'

export type CalendarHeaderProps = PolyProps<'header'>

export const CalendarHeader = (props: CalendarHeaderProps) => (
	<poly.header {...props} />
)
