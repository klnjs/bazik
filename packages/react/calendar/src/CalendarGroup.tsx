import { poly, type PolyProps } from '@klnjs/core'

export type CalendarGroupProps = PolyProps<'div'>

export const CalendarGroup = (props: CalendarGroupProps) => (
	<poly.div {...props} />
)
