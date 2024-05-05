import { useCallback, useMemo } from 'react'
import { Temporal } from 'temporal-polyfill'
import { poly, forwardRef, toData, type CoreProps } from '@klnjs/core'
import { isAfter, isBefore } from '@klnjs/temporal'
import { useCalendarContext } from './CalendarContext'
import {
	useCalendarFieldNames,
	useCalendarLocalisation
} from './useCalendarLocalisation'

export type CalendarNavigateProps = CoreProps<
	'button',
	{ action: 'inc' | 'dec'; unit?: 'years' | 'months' }
>

export const CalendarNavigate = forwardRef<'button', CalendarNavigateProps>(
	(
		{
			action,
			unit = 'months',
			disabled: disabledProp = false,
			children,
			...otherProps
		},
		forwardedRef
	) => {
		const {
			min,
			max,
			locale,
			disabled: disabledContext,
			highlighted,
			visibleMonths,
			updateVisibleRange
		} = useCalendarContext()
		const { t } = useCalendarLocalisation(locale)
		const { names: fieldNames } = useCalendarFieldNames(locale)

		const duration = useMemo(() => {
			const increment = Temporal.Duration.from({
				years: unit === 'years' ? 1 : 0,
				months: unit === 'months' ? visibleMonths : 0
			})

			return action === 'inc' ? increment : increment.negated()
		}, [action, unit, visibleMonths])

		const label = useMemo(
			() => t(action, { unit: fieldNames.of(unit.slice(0, -1)) ?? '' }),
			[action, unit, t, fieldNames]
		)

		const content = useMemo(() => {
			switch (action) {
				case 'inc':
					return unit === 'years' ? '»' : '›'
				case 'dec':
					return unit === 'years' ? '«' : '‹'
				default:
					return '•'
			}
		}, [action, unit])

		const result = useMemo(
			() => highlighted.add(duration),
			[duration, highlighted]
		)

		const isDisabled = useMemo(
			() =>
				disabledProp ||
				disabledContext ||
				Boolean(max && isAfter(result, max)) ||
				Boolean(min && isBefore(result, min)),
			[min, max, result, disabledProp, disabledContext]
		)

		const handleClick = useCallback(() => {
			updateVisibleRange(duration)
		}, [duration, updateVisibleRange])

		return (
			<poly.button
				ref={forwardedRef}
				type="button"
				disabled={isDisabled}
				data-disabled={toData(isDisabled)}
				aria-label={label}
				aria-disabled={isDisabled}
				onClick={handleClick}
				{...otherProps}
			>
				{children ?? content}
			</poly.button>
		)
	}
)
