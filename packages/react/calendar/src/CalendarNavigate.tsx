import { useCallback, useMemo } from 'react'
import { Temporal } from 'temporal-polyfill'
import { poly, forwardRef, toData, type CoreProps } from '@klnjs/core'
import { isAfter, isBefore } from '@klnjs/temporal'
import { useCalendarContext } from './CalendarContext'
import {
	useCalendarDateFieldNames,
	useCalendarLocalisation
} from './useCalendarLocalisation'

import type { PlainDate } from './CalendarTypes'

export type CalendarNavigateProps = CoreProps<
	'button',
	| { action: 'set'; unit: PlainDate }
	| { action: 'inc' | 'dec'; unit?: 'years' | 'months' }
>

export const CalendarNavigate = forwardRef<'button', CalendarNavigateProps>(
	(
		{
			action,
			unit,
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
			updateHighlighted,
			updateVisibleRange
		} = useCalendarContext()
		const { t } = useCalendarLocalisation(locale)
		const { names: dateFieldNames } = useCalendarDateFieldNames(locale)

		const duration = useMemo(
			() =>
				Temporal.Duration.from({
					years: unit === 'years' ? 1 : 0,
					months:
						unit === 'months' || unit === undefined
							? visibleMonths
							: 0
				}),
			[action, unit, visibleMonths]
		)

		const label = useMemo(() => {
			if (action === 'set') {
				return t(action, {
					date: unit.toLocaleString(locale, {
						year: 'numeric',
						month: 'long',
						weekday: 'long',
						day: 'numeric'
					})
				})
			}

			return t(action, {
				segment:
					dateFieldNames.of(unit === 'years' ? 'year' : 'month') ?? ''
			})
		}, [action, unit, t, locale, dateFieldNames])

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
			() => (action === 'set' ? unit : highlighted.add(duration)),
			[action, unit, duration, highlighted]
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
			if (action === 'set') {
				updateHighlighted(result)
			} else if (action === 'inc') {
				updateVisibleRange(duration)
			} else {
				updateVisibleRange(duration.negated())
			}
		}, [action, result, duration, updateHighlighted, updateVisibleRange])

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
