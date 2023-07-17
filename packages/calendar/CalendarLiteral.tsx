import { freya, forwardRef, type AsChildComponentProps } from '../core'

export type CalendarLiteralProps = AsChildComponentProps<'span'>

export const CalendarLiteral = forwardRef<'span', CalendarLiteralProps>(
	(props, forwardedRef) => (
		<freya.span
			ref={forwardedRef}
			role='presentation'
			aria-hidden
			{...props}
		/>
	)
)
