import { Temporal } from 'temporal-polyfill'
import { poly, type PolyProps } from '@klnjs/core'
import { isDefined } from '@klnjs/assertion'
import { plainDate } from '@klnjs/temporal'
import { useCalendarContext } from './CalendarContext'
import { useCalendarLocalisation } from './useCalendarLocalisation'
import { createVisibleRange } from './useCalendarVisibleRange'

export type CalendarButtonProps = PolyProps<
	'button',
	{ action: 'inc' | 'dec'; unit?: 'years' | 'months' }
>

export const CalendarButton = (
	(
		{
			action,
			disabled: disabledProp = false,
			unit = 'months',
			children,
			...otherProps
		}: CalendarButtonProps
	) => {
		const {
			disabled: disabledContext,
			locale,
			max,
			min,
			paginationDuration,
			visibleDuration,
			visibleRange,
			setHighlighted,
			setVisibleRange
		} = useCalendarContext()
		const { t, fieldNames } = useCalendarLocalisation(locale)

		const label = t(action, {
			unit: fieldNames.of(unit.slice(0, -1)) ?? ''
		})

		const content =
			action === 'inc'
				? unit === 'years'
					? '»'
					: '›'
				: unit === 'years'
					? '«'
					: '‹'

		const isDisabled =
			disabledProp ||
			disabledContext ||
			(action === 'dec' &&
				isDefined(min) &&
				plainDate.isBefore(visibleRange[0], min)) ||
			(action === 'inc' &&
				isDefined(max) &&
				plainDate.isAfter(visibleRange[1], max))

		const handleClick = () => {
			const page =
				unit === 'months'
					? paginationDuration
					: Temporal.Duration.from({
							years: 1
						})

			const date =
				action === 'inc'
					? visibleRange[0].add(page)
					: visibleRange[1].subtract(page)

			const result = createVisibleRange({
				date,
				span: visibleDuration,
				align: action === 'inc' ? 'start' : 'end',
				min,
				max
			})

			setVisibleRange(result)
			setHighlighted((prev) =>
				plainDate.clamp(date.with({ day: prev.day }), min, max)
			)
		}

		return (
			<poly.button
				type="button"
				disabled={isDisabled}
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
