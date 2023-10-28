import {
	useRef,
	useMemo,
	useCallback,
	useLayoutEffect,
	type KeyboardEvent
} from 'react'
import type { Temporal } from 'temporal-polyfill'
import {
	freya,
	forwardRef,
	useMergeRefs,
	toData,
	isRTL,
	isSet,
	type CoreProps
} from '../core'
import { useCalendarLocalisation } from './useCalendarLocalisation'
import {
	isAfter,
	isBefore,
	isBetween,
	isEndOfWeek,
	isSameMonth,
	isStartOfWeek,
	isToday as isTodayFn,
	isWeekend as isWeekendFn
} from './useCalendarDateUtils'
import { useCalendarContext } from './CalendarContext'
import { useCalendarGridContext } from './CalendarGridContext'

export type CalendarDayProps = CoreProps<
	'div',
	{
		date: Temporal.PlainDate
		disabled?: boolean
		disabledIfWeekend?: boolean
		disabledIfOverflow?: boolean
	}
>

export const CalendarDay = forwardRef<'div', CalendarDayProps>(
	(
		{
			date,
			disabled: disabledProp = false,
			disabledIfWeekend = false,
			disabledIfOverflow = false,
			children,
			...otherProps
		},
		forwardedRef
	) => {
		const ref = useRef<HTMLDivElement>(null)
		const refCallback = useMergeRefs(ref, forwardedRef)

		const {
			disabled: disabledContext,
			focusWithin,
			highlight,
			highlighted,
			locale,
			max,
			min,
			readOnly,
			select,
			selectionIsTransient,
			selectionMode,
			selectionToDisplay
		} = useCalendarContext()
		const { year, month } = useCalendarGridContext()
		const { names } = useCalendarLocalisation(locale)

		const isOne = selectionMode === 'one' && isSet(selectionToDisplay)
		const isMany = selectionMode === 'many' && isSet(selectionToDisplay)
		const isRange = selectionMode === 'range' && isSet(selectionToDisplay)

		const isToday = isTodayFn(date)
		const isWeekend = isWeekendFn(date, locale)
		const isWeekEnd = isEndOfWeek(date, locale)
		const isWeekStart = isStartOfWeek(date, locale)
		const isOverflow = !isSameMonth(date, date.with({ year, month }))
		const isHighlighted = date.equals(highlighted)
		const isDisabled =
			disabledProp ||
			disabledContext ||
			(disabledIfWeekend && isWeekend) ||
			(disabledIfOverflow && isOverflow) ||
			Boolean(max && isAfter(date, max)) ||
			Boolean(min && isBefore(date, min))

		const isRangeEnd = isRange && date.equals(selectionToDisplay[1])
		const isRangeStart = isRange && date.equals(selectionToDisplay[0])
		const isRangeBetween =
			isRange &&
			isBetween(date, selectionToDisplay[0], selectionToDisplay[1])

		const isFocusable = !isDisabled
		const isTabbable = isFocusable && isHighlighted
		const isSelectable = isFocusable && !readOnly
		const isSelected =
			(isOne && date.equals(selectionToDisplay)) ||
			(isMany && selectionToDisplay.some((s) => date.equals(s))) ||
			(isRange && (isRangeEnd || isRangeStart))

		const shouldHighlightOnOver = isSelectable && selectionIsTransient
		const shouldGrabFocus =
			isHighlighted &&
			focusWithin &&
			document.activeElement !== ref.current &&
			document.activeElement instanceof HTMLElement &&
			document.activeElement.dataset.day === 'true'

		const label = useMemo(() => {
			const formatted = date.toLocaleString(locale, {
				year: 'numeric',
				month: 'long',
				weekday: 'long',
				day: 'numeric'
			})

			if (isToday) {
				return `${names.of('today')}, ${formatted}`
			}

			return formatted
		}, [date, locale, names, isToday])

		const handleOver = useCallback(() => {
			if (shouldHighlightOnOver) {
				highlight(date)
			}
		}, [date, shouldHighlightOnOver, highlight])

		const handleClick = useCallback(() => {
			if (isSelectable) {
				select(date)
				highlight(date)
			}
		}, [date, isSelectable, select, highlight])

		const handleKeyboard = useCallback(
			(event: KeyboardEvent<HTMLDivElement>) => {
				if (
					event.shiftKey ||
					event.ctrlKey ||
					event.altKey ||
					event.metaKey
				) {
					return
				}

				if (event.code !== 'Tab') {
					event.preventDefault()
				}

				if (event.code === 'Enter' || event.code === 'Space') {
					select(date)
					highlight(date)
				}

				if (event.code === 'ArrowUp') {
					highlight(date.subtract({ days: 7 }))
				}

				if (event.code === 'ArrowRight') {
					highlight(
						date.subtract({
							days: isRTL(event.target) ? 1 : -1
						})
					)
				}

				if (event.code === 'ArrowDown') {
					highlight(date.add({ days: 7 }))
				}

				if (event.key === 'ArrowLeft') {
					highlight(
						date.add({
							days: isRTL(event.target) ? 1 : -1
						})
					)
				}

				if (event.code === 'PageUp') {
					highlight(date.subtract({ months: 1 }))
				}

				if (event.code === 'PageDown') {
					highlight(date.add({ months: 1 }))
				}

				if (event.code === 'Home') {
					highlight(date.with({ day: 1 }))
				}

				if (event.code === 'End') {
					highlight(date.with({ day: date.daysInMonth }))
				}
			},
			[date, select, highlight]
		)

		useLayoutEffect(() => {
			if (shouldGrabFocus) {
				ref.current?.focus()
			}
		}, [shouldGrabFocus])

		return (
			<freya.div
				ref={refCallback}
				role="button"
				tabIndex={isTabbable ? 0 : -1}
				data-day
				data-today={toData(isToday)}
				data-weekend={toData(isWeekend)}
				data-week-start={toData(isWeekStart)}
				data-week-end={toData(isWeekEnd)}
				data-overflow={toData(isOverflow)}
				data-disabled={toData(isDisabled)}
				data-selected={toData(isSelected)}
				data-highlighted={toData(isHighlighted)}
				data-range-end={toData(isRangeEnd)}
				data-range-start={toData(isRangeStart)}
				data-range-between={toData(isRangeBetween)}
				aria-label={label}
				aria-readonly={readOnly}
				aria-selected={isSelected}
				aria-disabled={isDisabled}
				onClick={handleClick}
				onKeyDown={handleKeyboard}
				onPointerOver={handleOver}
				{...otherProps}
			>
				{children ?? date.day}
			</freya.div>
		)
	}
)
