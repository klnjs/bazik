import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDateSegmentTypeEditable } from './CalendarDate'

type CalendarButtonSegment = Extract<
	CalendarDateSegmentTypeEditable,
	'year' | 'month'
>

type CalendarButtonSegmentUpdate = '-1' | '+1'

type CalendarButtonAction =
	`${CalendarButtonSegment}${CalendarButtonSegmentUpdate}`

export type CalendarButtonProps = AsChildComponentProps<
	'button',
	{ action: CalendarButtonAction }
>

export const CalendarButton = forwardRef<'button', CalendarButtonProps>(
	({ action, ...otherProps }, forwardedRef) => {
		const { minDate, maxDate, focusedDate, setFocusedDate } =
			useCalendarContext()

		const [segment, update] = action.split(/(?=\+|-)/) as [
			CalendarDateSegmentTypeEditable,
			CalendarButtonSegmentUpdate
		]

		const n = Number(update)
		const l = update === '-1' ? minDate : maxDate
		const i = update === '-1' ? 'isBefore' : 'isAfter'
		const g = update === '-1' ? 'getLastDateOfMonth' : 'getFirstDateOfMonth'

		const target = focusedDate.calc({ [segment]: n })[g]()
		const disabled = l && target[i](l)

		const onClick = () => setFocusedDate(target)

		return (
			<freya.button
				ref={forwardedRef}
				type='button'
				disabled={disabled}
				onClick={onClick}
				{...otherProps}
			/>
		)
	}
)
