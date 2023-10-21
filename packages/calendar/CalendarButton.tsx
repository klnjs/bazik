import { useCallback, useMemo } from 'react'
import { freya, forwardRef, toData, type CoreProps } from '../core'
import { useCalendarContext } from './CalendarContext'
import { useCalendarLocalisation } from './useCalendarLocalisation'
import { isAfter, isBefore, getToday } from './useCalendarDateUtils'

export type CalendarButtonProps = CoreProps<
	'button',
	| { action: 'today'; segment?: never }
	| { action: 'next' | 'previous'; segment?: 'year' | 'month' }
>

export const CalendarButton = forwardRef<'button', CalendarButtonProps>(
	(
		{
			action,
			segment = 'month',
			disabled: disabledProp = false,
			...otherProps
		},
		forwardedRef
	) => {
		const {
			min,
			max,
			months,
			locale,
			disabled: disabledContext,
			highlighted,
			setHighlighted
		} = useCalendarContext()
		const { t, names } = useCalendarLocalisation(locale)

		const label = useMemo(
			() =>
				action === 'today'
					? names.of('today')
					: t(action, {
							segment
					  }),
			[action, segment, t, names]
		)

		const direction = action === 'next' ? 1 : -1

		const result = useMemo(
			() =>
				action === 'today'
					? getToday()
					: highlighted.add({
							[`${segment}s`]:
								(segment === 'month' ? months.length : 1) *
								direction
					  }),
			[action, segment, direction, months, highlighted]
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
			setHighlighted(result)
		}, [result, setHighlighted])

		return (
			<freya.button
				ref={forwardedRef}
				type="button"
				disabled={isDisabled}
				data-disabled={toData(isDisabled)}
				aria-label={label}
				aria-disabled={isDisabled}
				onClick={handleClick}
				{...otherProps}
			/>
		)
	}
)
