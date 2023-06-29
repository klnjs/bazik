import { useCallback, type KeyboardEvent } from 'react'
import {
	freya,
	forwardRef,
	splitProps,
	type AsChildComponentProps
} from '../core'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDate } from './CalendarDate'

export type CalendarGridDayProps = AsChildComponentProps<
	'button',
	{ date: CalendarDate }
>

export const CalendarGridDay = forwardRef<'button', CalendarGridDayProps>(
	(props, forwardedRef) => {
		const [{ date }, componentProps] = splitProps(props, ['date'])
		const { state } = useCalendarContext()

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLButtonElement>) => {
				if (event.key === 'ArrowUp') {
					state.setDate((prev) => prev.subtract({ day: 7 }))
				}

				if (event.key === 'ArrowRight') {
					state.setDate((prev) => prev.add({ day: 1 }))
				}

				if (event.key === 'ArrowDown') {
					state.setDate((prev) => prev.add({ day: 7 }))
				}

				if (event.key === 'ArrowLeft') {
					state.setDate((prev) => prev.subtract({ day: 1 }))
				}
			},
			[state]
		)

		return (
			<freya.button
				ref={forwardedRef}
				type='button'
				tabIndex={date.isToday() ? 0 : -1}
				onClick={() => state.setDate(date)}
				onKeyDown={handleKeyDown}
				{...componentProps}
			/>
		)
	}
)
