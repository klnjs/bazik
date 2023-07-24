import { freya, forwardRef, type CoreProps } from '../core'

export type CalendarFieldLiteralProps = CoreProps<'span'>

export const CalendarFieldLiteral = forwardRef<
	'span',
	CalendarFieldLiteralProps
>((props, forwardedRef) => (
	<freya.span ref={forwardedRef} role='presentation' aria-hidden {...props} />
))
