import { freya, forwardRef, type AsChildComponentProps } from '../core'

export type CalendarFieldLiteralProps = AsChildComponentProps<'span'>

export const CalendarFieldLiteral = forwardRef<
	'span',
	CalendarFieldLiteralProps
>((props, forwardedRef) => (
	<freya.span ref={forwardedRef} role='presentation' aria-hidden {...props} />
))
