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

		const content = useMemo(() => {
			switch (action) {
				case 'next':
					return segment === 'month' ? '›' : '»'
				case 'previous':
					return segment === 'month' ? '‹' : '«'
				default:
					return '•'
			}
		}, [action, segment])

		const result = useMemo(
			() =>
				action === 'today'
					? getToday()
					: highlighted.add({
							[`${segment}s`]:
								(segment === 'month' ? visibleMonths : 1) *
								(action === 'next' ? 1 : -1)
					  }),
			[action, segment, highlighted, visibleMonths]
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
			>
				{children ?? content}
			</freya.button>
		)
	}
)
