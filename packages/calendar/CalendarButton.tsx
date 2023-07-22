import { useCallback, useMemo } from 'react'
import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { useCalendarContext } from './CalendarContext'
import {
	CalendarDate,
	type CalendarDateSegmentTypeEditable
} from './CalendarDate'
import { useCalendarLocalisation } from './useCalendarLocalisation'

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
	(
		{ action, disabled: disabledProp = false, ...otherProps },
		forwardedRef
	) => {
		const {
			locale,
			disabled: disabledContext,
			minDate,
			maxDate,
			focusedDate,
			setFocusedDate
		} = useCalendarContext()
		const { t } = useCalendarLocalisation(locale)

		const [segment, modifier] = action.split(/(?=\+|-)/) as [
			CalendarButtonSegment | 'today',
			CalendarButtonModifier
		]

		const label = t(modifier === '-1' ? 'previous' : 'next', {
			segment
		})

		const isDisabled = useMemo(() => {
			if (disabledProp || disabledContext) {
				return true
			}

			if (segment === 'today') {
				return false
			}

			const n = Number(modifier)
			const m = modifier === '-1'
			const l = m ? minDate : maxDate
			const i = m ? 'isBefore' : 'isAfter'
			const g = m ? 'getLastDateOfMonth' : 'getFirstDateOfMonth'
			const a = focusedDate.calc({ [segment]: n })[g]()

			return l && a[i](l)
		}, [
			segment,
			modifier,
			maxDate,
			minDate,
			focusedDate,
			disabledProp,
			disabledContext
		])

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
				disabled={isDisabled}
				data-disabled={isDisabled ? '' : undefined}
				aria-label={label}
				aria-disabled={isDisabled}
				onClick={onClick}
				{...otherProps}
			/>
		)
	}
)
