import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDateSegmentTypeEditable } from './CalendarDate'

export type CalendarButtonSegment = Extract<
	CalendarDateSegmentTypeEditable,
	'year' | 'month'
>

export type CalendarButtonAction =
	| `${CalendarButtonSegment}-1`
	| `${CalendarButtonSegment}+1`

export type CalendarButtonProps = AsChildComponentProps<
	'button',
	{ action: CalendarButtonAction }
>

export const CalendarButton = forwardRef<'button', CalendarButtonProps>(
	({ action, ...otherProps }, forwardedRef) => {
		const {
			state,
			config: { min, max }
		} = useCalendarContext()

		const [segment, number] = action.split(/(?=\+|-)/) as [
			CalendarDateSegmentTypeEditable,
			string
		]

		const limit = number.startsWith('-') ? min : max
		const target = number.startsWith('-')
			? 'getLastDateOfMonth'
			: 'getFirstDateOfMonth'

		const predicate = number.startsWith('-') ? 'isBefore' : 'isAfter'

		const isDisabled =
			limit &&
			state.focusedDate
				.calc({
					[segment]: Number(number)
				})
				[target]()
				[predicate](limit)

		const onClick = () =>
			state.setFocusedDate((prev) => {
				const next = prev.calc({ [segment]: Number(number) })

				return limit && next[predicate](limit) ? limit : next
			})

		return (
			<freya.button
				ref={forwardedRef}
				type='button'
				disabled={isDisabled}
				onClick={onClick}
				{...otherProps}
			/>
		)
	}
)
