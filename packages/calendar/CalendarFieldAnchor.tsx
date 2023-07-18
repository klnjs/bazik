import {
	freya,
	forwardRef,
	useForwardedRef,
	type AsChildComponentProps
} from '../core'
import { useCalendarFieldContext } from './CalendarFieldContext'

export type CalendarFieldAnchorProps = AsChildComponentProps<'div'>

export const CalendarFieldAnchor = forwardRef<'div', CalendarFieldAnchorProps>(
	(props, forwardedRef) => {
		const { anchorRef } = useCalendarFieldContext()

		useForwardedRef(anchorRef, forwardedRef)

		return <freya.div ref={anchorRef} {...props} />
	}
)
