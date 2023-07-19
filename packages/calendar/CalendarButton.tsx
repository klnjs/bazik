import { useMemo } from 'react'
import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDateSegmentTypeEditable } from './CalendarDate'

type CalendarButtonSegment = Extract<
	CalendarDateSegmentTypeEditable,
	'year' | 'month'
>

type CalendarButtonSegmentUpdate = '-1' | '+1'

type CalendarButtonAction =
	| `${CalendarButtonSegment}${CalendarButtonSegmentUpdate}`

export type CalendarButtonProps = AsChildComponentProps<
	'button',
	{ action: CalendarButtonAction }
>

export const CalendarButton = forwardRef<'button', CalendarButtonProps>(
	({ action, ...otherProps }, forwardedRef) => {
		const { minDate, maxDate, focusedDate, setFocusedDate } =
			useCalendarContext()

		const [segment, no] = action.split(/(?=\+|-)/) as [
			CalendarDateSegmentTypeEditable,
			CalendarButtonSegmentUpdate
		]

		const disabled = useMemo(() => {
			const n = Number(no)
			const l = no === '-1' ? minDate : maxDate
			const i = no === '-1' ? 'isBefore' : 'isAfter'
			const g = no === '-1' ? 'getLastDateOfMonth' : 'getFirstDateOfMonth'
			const t = focusedDate.calc({ [segment]: n })[g]()

			return l && t[i](l)
		}, [segment, no, maxDate, minDate, focusedDate])

		const onClick = () =>
			setFocusedDate((prev) => prev.calc({ [segment]: Number(no) }))

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
