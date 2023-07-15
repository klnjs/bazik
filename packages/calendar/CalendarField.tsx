import {
	freya,
	forwardRef,
	type AsChildComponentProps,
	useForwardedRef
} from '../core'
import { useCalendarContext } from './CalendarContext'

export type CalendarFieldProps = AsChildComponentProps<'div'>

export const CalendarField = forwardRef<'div', CalendarFieldProps>(
	(props, forwardedRef) => {
		const { refs } = useCalendarContext()

		useForwardedRef(refs.field, forwardedRef)

		return <freya.div ref={refs.field} role='group' {...props} />
	}
)
