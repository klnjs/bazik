import { poly,  type PolyProps } from '@klnjs/core'

export type CalendarFieldLiteralProps = PolyProps<'span'>

export const CalendarFieldLiteral = ((props: CalendarFieldLiteralProps) => (
	<poly.span role="presentation" aria-hidden {...props} />
))
