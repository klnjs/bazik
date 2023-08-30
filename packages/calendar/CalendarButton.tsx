import { useCallback, useMemo } from 'react'
import { freya, forwardRef, toData, type CoreProps } from '../core'
import { DateTime } from './CalendarDateTime'
import { useCalendarContext } from './CalendarContext'
import { useCalendarLocalisation } from './useCalendarLocalisation'

type CalendarButtonSegment = 'year' | 'month'

type CalendarButtonModifier = '-1' | '+1'

type CalendarButtonAction =
	| 'today'
	| `${CalendarButtonSegment}${CalendarButtonModifier}`

export type CalendarButtonProps = CoreProps<
	'button',
	{ action: CalendarButtonAction }
>

export const CalendarButton = forwardRef<'button', CalendarButtonProps>(
	(
		{ action, disabled: disabledProp = false, ...otherProps },
		forwardedRef
	) => {
		const {
			min,
			max,
			locale,
			disabled: disabledContext,
			highlighted,
			setHighlighted
		} = useCalendarContext()
		const { t, names } = useCalendarLocalisation(locale)

		const [segment, modifier] = action.split(/(?=\+|-)/) as [
			CalendarButtonSegment | 'today',
			CalendarButtonModifier
		]

		const label = useMemo(() => {
			if (segment === 'today') {
				return names.of('today')
			}

			return t(modifier === '-1' ? 'previous' : 'next', {
				segment
			})
		}, [segment, modifier, t, names])

		const isDisabled = useMemo(() => {
			if (disabledProp || disabledContext) {
				return true
			}

			if (segment === 'today') {
				return false
			}

			const n = Number(modifier)
			const m = modifier === '-1'
			const l = m ? min : max
			const i = m ? 'isBefore' : 'isAfter'
			const g = m ? 'getLastDateOfMonth' : 'getFirstDateOfMonth'
			const a = highlighted.calc({ [segment]: n })[g]()

			return l && a[i](l)
		}, [
			min,
			max,
			segment,
			modifier,
			highlighted,
			disabledProp,
			disabledContext
		])

		const onClick = useCallback(() => {
			setHighlighted((prev) => {
				if (segment === 'today') {
					return new DateTime()
				}

				return prev.calc({ [segment]: Number(modifier) })
			})
		}, [segment, modifier, setHighlighted])

		return (
			<freya.button
				ref={forwardedRef}
				type="button"
				disabled={isDisabled}
				data-disabled={toData(isDisabled)}
				aria-label={label}
				aria-disabled={isDisabled}
				onClick={onClick}
				{...otherProps}
			/>
		)
	}
)
