import {
	freya,
	forwardRef,
	splitProps,
	type AsChildComponentProps
} from '../core'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDateSegment } from './CalendarDate'

export type CalendarButtonProps = AsChildComponentProps<
	'button',
	{ action: `${CalendarDateSegment}-1` | `${CalendarDateSegment}+1` }
>

export const CalendarButton = forwardRef<'button', CalendarButtonProps>(
	(props, forwardedRef) => {
		const { state, config } = useCalendarContext()
		const [{ action }, otherProps] = splitProps(props, ['action'])
		const [segment, number] = action.split(/(?=\+|-)/) as [
			CalendarDateSegment,
			string
		]
		const check = number.startsWith('+') ? 'isAfter' : 'isBefore'
		const limit = number.startsWith('+') ? config.max : config.min

		const isDisabled = state.dateVisible
			.calc({
				[segment]: Number(number)
			})
			[check](limit)

		const onClick = () =>
			state.setDateVisible((date) =>
				date.calc({ [segment]: Number(number) })
			)

		return (
			<freya.button
				ref={forwardedRef}
				disabled={isDisabled}
				onClick={onClick}
				{...otherProps}
			/>
		)
	}
)
