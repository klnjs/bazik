import { useCallback, useMemo } from 'react'
import { freya, forwardRef, type CoreProps } from '../core'
import { useCalendarContext } from './CalendarContext'
import { CalendarDate, type CalendarDateSegmentType } from './CalendarDate'
import { useCalendarLocalisation } from './useCalendarLocalisation'

type CalendarButtonSegment = Extract<CalendarDateSegmentType, 'year' | 'month'>

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
			locale,
			disabled: disabledContext,
			minDate,
			maxDate,
			highlighted,
			setHighlighted
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
			const a = highlighted.calc({ [segment]: n })[g]()

			return l && a[i](l)
		}, [
			segment,
			modifier,
			highlighted,
			maxDate,
			minDate,
			disabledProp,
			disabledContext
		])

		const onClick = useCallback(() => {
			setHighlighted((prev) => {
				if (segment === 'today') {
					return new CalendarDate(locale)
				}

				return prev.calc({ [segment]: Number(modifier) })
			})
		}, [locale, segment, modifier, setHighlighted])

		return (
			<freya.button
				ref={forwardedRef}
				type="button"
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
