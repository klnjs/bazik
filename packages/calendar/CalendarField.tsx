import {
	freya,
	forwardRef,
	useForwardedRef,
	type AsChildComponentProps
} from '../core'
import { useCalendarContext } from './CalendarContext'

export type CalendarFieldProps = AsChildComponentProps<'div'>

export const CalendarField = forwardRef<'div', CalendarFieldProps>(
	(props, forwardedRef) => {
		const { elements } = useCalendarContext()

		useForwardedRef(elements.field.ref, forwardedRef)

		return <freya.div ref={elements.field.ref} role='group' {...props} />
	}
)
