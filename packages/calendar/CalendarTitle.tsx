import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { useCalendarContext } from './CalendarContext'

export type CalendarTitleProps = AsChildComponentProps<'h2'>

export const CalendarTitle = forwardRef<'h2', CalendarTitleProps>(
	(props, forwardedRef) => {
		const { focusedDate } = useCalendarContext()

		return (
			<freya.h2 ref={forwardedRef} aria-live='polite' {...props}>
				{focusedDate.format({
					year: 'numeric',
					month: 'long'
				})}
			</freya.h2>
		)
	}
)
