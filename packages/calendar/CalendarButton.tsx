import { useCallback, useMemo } from 'react'
import { freya, forwardRef, toData, type CoreProps } from '../core'
import { useCalendarContext } from './CalendarContext'
import { useCalendarLocalisation } from './useCalendarLocalisation'
import { isAfter, isBefore, getToday } from './useCalendarTemporal'

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

			const result =
				segment === 'today'
					? getToday()
					: highlighted.add({ [`${segment}s`]: Number(modifier) })

			const resultIsBeforeMin = Boolean(min && isBefore(result, min))
			const resultIsAfterMax = Boolean(max && isAfter(result, max))

			return resultIsBeforeMin || resultIsAfterMax
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
					return getToday()
				}

				return prev.add({ [`${segment}s`]: Number(modifier) })
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
