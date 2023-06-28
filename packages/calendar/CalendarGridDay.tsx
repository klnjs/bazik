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
		const [{ date }, componentProps] = splitProps(props, ['date'])
		const { state } = useCalendarFieldContext()

		return (
			<freya.div
				ref={forwardedRef}
				onClick={() => state.setDate(date)}
				{...componentProps}
			/>
		)
	}
)
