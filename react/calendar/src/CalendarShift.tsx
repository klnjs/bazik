import { useCallback, useMemo } from 'react'
import { Temporal } from 'temporal-polyfill'
import { poly, forwardRef, toData, type CoreProps, isSet } from '@klnjs/core'
import { useCalendarContext } from './CalendarContext'
import {
	useCalendarDateFieldNames,
	useCalendarLocalisation
} from './useCalendarLocalisation'
import { isAfter, isBefore } from './calendar-functions'
import type { Date } from './calendar-types'

export type CalendarShiftProps = CoreProps<
	'button',
	| { action: 'set'; years?: never; months?: never; date: Date }
	| { action: 'add' | 'sub'; years: number; months?: never; date?: never }
	| { action: 'add' | 'sub'; years?: never; months?: number; date?: never }
>

export const CalendarShift = forwardRef<'button', CalendarShiftProps>(
	(
		{
			action,
			date,
			years,
			months,
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
			highlight,
			highlighted,
			visibleMonths,
			visibleRangeShift
		} = useCalendarContext()
		const { t } = useCalendarLocalisation(locale)
		const { names: dateFieldNames } = useCalendarDateFieldNames(locale)

		const duration = useMemo(() => {
			const initial = Temporal.Duration.from({
				years,
				months: months ?? visibleMonths
			})

			return action === 'sub' ? initial.negated() : initial
		}, [action, years, months, visibleMonths])

		const label = useMemo(() => {
			if (action === 'set') {
				return t(action, {
					date: date.toLocaleString(locale, {
						year: 'numeric',
						month: 'long',
						weekday: 'long',
						day: 'numeric'
					})
				})
			}

			return t(action, {
				segment:
					dateFieldNames.of(isSet(years) ? 'year' : 'month') ?? ''
			})
		}, [action, date, years, t, locale, dateFieldNames])

		const content = useMemo(() => {
			switch (action) {
				case 'add':
					return isSet(years) ? '»' : '›'
				case 'sub':
					return isSet(years) ? '«' : '‹'
				default:
					return '•'
			}
		}, [action, years])

		const result = useMemo(
			() => (action === 'set' ? date : highlighted.add(duration)),
			[action, date, duration, highlighted]
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
				highlight(result)
			} else {
				visibleRangeShift(duration)
			}
		}, [action, result, duration, highlight, visibleRangeShift])

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
