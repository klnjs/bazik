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

		useForwardedRef(refs.fieldRef, forwardedRef)

		return <freya.div ref={refs.fieldRef} role='group' {...props} />
	}
)
