import { useCallback, useMemo } from 'react'
import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { useCalendarContext } from './CalendarContext'
import {
	CalendarDate,
	type CalendarDateSegmentTypeEditable
} from './CalendarDate'

type CalendarButtonSegment = Extract<
	CalendarDateSegmentTypeEditable,
	'year' | 'month'
>

type CalendarButtonModifier = '-1' | '+1'

type CalendarButtonAction =
	| 'today'
	| `${CalendarButtonSegment}${CalendarButtonModifier}`

export type CalendarButtonProps = AsChildComponentProps<
	'button',
	{ action: CalendarButtonAction }
>

export const CalendarButton = forwardRef<'button', CalendarButtonProps>(
	({ action, ...otherProps }, forwardedRef) => {
		const { locale, minDate, maxDate, focusedDate, setFocusedDate } =
			useCalendarContext()

		const [segment, modifier] = action.split(/(?=\+|-)/) as [
			CalendarButtonSegment | 'today',
			CalendarButtonModifier
		]

		const disabled = useMemo(() => {
			if (segment === 'today') {
				return false
			}

			const n = Number(modifier)
			const m = modifier === '-1'
			const l = m ? minDate : maxDate
			const i = m ? 'isBefore' : 'isAfter'
			const g = m ? 'getLastDateOfMonth' : 'getFirstDateOfMonth'
			const t = focusedDate.calc({ [segment]: n })[g]()

			return l && t[i](l)
		}, [segment, modifier, maxDate, minDate, focusedDate])

		const onClick = useCallback(() => {
			setFocusedDate((prev) => {
				if (segment === 'today') {
					return new CalendarDate(locale)
				}

				return prev.calc({ [segment]: Number(modifier) })
			})
		}, [locale, segment, modifier, setFocusedDate])

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
