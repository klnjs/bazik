import {
	useRef,
	useMemo,
	useCallback,
	useLayoutEffect,
	type KeyboardEvent
} from 'react'
import {
	freya,
	forwardRef,
	useMergeRefs,
	toData,
	isRTL,
	isSet,
	type CoreProps
} from '../core'
import { useCalendarContext } from './CalendarContext'
import { useCalendarDayNames } from './useCalendarLocalisation'
import { useCalendarGridContext } from './CalendarGridContext'
import {
	isAfter,
	isBefore,
	isBetween,
	isEndOfWeek,
	isSameDay,
	isSameMonth,
	isStartOfWeek,
	isToday as isTodayFn,
	isWeekend as isWeekendFn
} from './calendar-functions'
import type { Date } from './calendar-types'

export type CalendarDayProps = CoreProps<
	'div',
	{
		date: Date
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
			focusWithin: isFocusWithin,
			highlight,
			highlighted,
			locale,
			max,
			min,
			readOnly: isReadOnly,
			select,
			selectionIsTransient,
			selectionMode,
			selectionVisible
		} = useCalendarContext()
		const { month } = useCalendarGridContext()
		const { names: dayNames } = useCalendarDayNames(locale)

		const isOne = selectionMode === 'one' && isSet(selectionVisible)
		const isMany = selectionMode === 'many' && isSet(selectionVisible)
		const isRange = selectionMode === 'range' && isSet(selectionVisible)

		const isToday = isTodayFn(date)
		const isWeekend = isWeekendFn(date, locale)
		const isWeekEnd = isEndOfWeek(date, locale)
		const isWeekStart = isStartOfWeek(date, locale)
		const isOverflow = !isSameMonth(date, month.toPlainDate({ day: 1 }))
		const isHighlighted = isFocusWithin && isSameDay(date, highlighted)
		const isDisabled =
			disabledProp ||
			disabledContext ||
			(disabledIfWeekend && isWeekend) ||
			(disabledIfOverflow && isOverflow) ||
			Boolean(max && isAfter(date, max)) ||
			Boolean(min && isBefore(date, min))

		const isRangeStart = isRange && isSameDay(date, selectionVisible[0])
		const isRangeEnd = isRange && isSameDay(date, selectionVisible[1])
		const isRangeBetween =
			isRange && isBetween(date, selectionVisible[0], selectionVisible[1])

		const isFocusable = !isDisabled
		const isSelectable = isFocusable && !isReadOnly
		const isTabbable = isFocusable && isHighlighted
		const isSelected =
			(isOne && isSameDay(date, selectionVisible)) ||
			(isMany && selectionVisible.some((d) => isSameDay(date, d))) ||
			(isRange && (isRangeEnd || isRangeStart))

		const shouldHighlight = isSelectable && selectionIsTransient
		const shouldFocus =
			isFocusWithin &&
			isHighlighted &&
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
				return `${dayNames.of('today')}, ${formatted}`
			}

			return formatted
		}, [date, locale, dayNames, isToday])

		const handleOver = useCallback(() => {
			if (shouldHighlight) {
				highlight(date)
			}
		}, [date, shouldHighlight, highlight])

		const handleClick = useCallback(() => {
			if (isSelectable) {
				select(date)
				highlight(date)
			}
		}, [date, isSelectable, select, highlight])

		const handleKeyboard = useCallback(
			(event: KeyboardEvent<HTMLDivElement>) => {
				if (event.code !== 'Tab') {
					event.preventDefault()
				}

				if (
					event.shiftKey ||
					event.ctrlKey ||
					event.altKey ||
					event.metaKey
				) {
					return
				}

				if (
					(event.code === 'Enter' || event.code === 'Space') &&
					isSelectable
				) {
					select(date)
				} else if (event.code === 'ArrowUp') {
					highlight(date.add({ weeks: -1 }))
				} else if (event.code === 'ArrowRight') {
					highlight(date.add({ days: isRTL(event.target) ? -1 : 1 }))
				} else if (event.code === 'ArrowDown') {
					highlight(date.add({ weeks: 1 }))
				} else if (event.key === 'ArrowLeft') {
					highlight(date.add({ days: isRTL(event.target) ? 1 : -1 }))
				} else if (event.code === 'PageUp') {
					highlight(date.add({ months: 1 }))
				} else if (event.code === 'PageDown') {
					highlight(date.add({ months: 1 }))
				} else if (event.code === 'Home') {
					highlight(date.with({ day: 1 }))
				} else if (event.code === 'End') {
					highlight(date.with({ day: date.daysInMonth }))
				}
			},
			[date, isSelectable, select, highlight]
		)

		useLayoutEffect(() => {
			if (shouldFocus) {
				ref.current?.focus()
			}
		}, [shouldFocus])

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
				aria-readonly={isReadOnly}
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
