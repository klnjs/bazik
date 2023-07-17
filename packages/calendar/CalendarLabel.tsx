import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { useCalendarContext } from './CalendarContext'

export type CalendarLabelProps = AsChildComponentProps<'label'>

export const CalendarLabel = forwardRef<'label', CalendarLabelProps>(
	(props, forwardedRef) => {
		const { elements } = useCalendarContext()

		return (
			<freya.label id={elements.label.id} ref={forwardedRef} {...props} />
		)
	}
)
