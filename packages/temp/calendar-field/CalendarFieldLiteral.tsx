import { poly, forwardRef, type CoreProps } from '../core'

export type CalendarFieldLiteralProps = CoreProps<'span'>

export const CalendarFieldLiteral = forwardRef<
	'span',
	CalendarFieldLiteralProps
>((props, forwardedRef) => (
	<poly.span ref={forwardedRef} role="presentation" aria-hidden {...props} />
))
