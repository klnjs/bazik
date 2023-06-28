import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { splitProps } from '../core/splitProps'
import { useCalendarFieldContext } from './CalendarFieldContext'
import type { CalendarFieldDate } from './CalendarFieldDate'

export type CalendarGridDayProps = AsChildComponentProps<
	'div',
	{ date: CalendarFieldDate }
>

export const CalendarGridDay = forwardRef<'div', CalendarGridDayProps>(
	(props, forwardedRef) => {
		const context = useCalendarFieldContext()
		const [localProps, componentProps] = splitProps(props, ['date'])

		return (
			<freya.div
				ref={forwardedRef}
				onClick={() => context.state.setDate(localProps.date)}
				{...componentProps}
			/>
		)
	}
)
