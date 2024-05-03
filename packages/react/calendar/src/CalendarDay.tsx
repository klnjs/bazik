import {
	useRef,
	useMemo,
	useCallback,
	useLayoutEffect,
	type KeyboardEvent
} from 'react'
import {
	poly,
	forwardRef,
	toData,
	useRefComposed,
	type CoreProps
} from '@klnjs/core'
import { isRTL, isSet } from '@klnjs/assertion'
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
import type { PlainDate } from './CalendarTypes'

export type CalendarDayProps = CoreProps<
	'div',
	{
		date: PlainDate
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
		const refComposed = useRefComposed(ref, forwardedRef)

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
		const isActive = isSameDay(date, highlighted)
		const isWeekend = isWeekendFn(date, locale)
		const isWeekEnd = isEndOfWeek(date, locale)
		const isWeekStart = isStartOfWeek(date, locale)
		const isOverflow = !isSameMonth(date, month.toPlainDate({ day: 1 }))
		const isFocused = isFocusWithin && isActive
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

		const isTabbable = !isDisabled && isActive
		const isSelectable = !isDisabled && !isReadOnly
		const isSelected =
			(isOne && isSameDay(date, selectionVisible)) ||
			(isMany && selectionVisible.some((d) => isSameDay(date, d))) ||
			(isRange && (isRangeEnd || isRangeStart))

		const shouldFocus = isFocused
		const shouldFocusOnPointerOver = isSelectable && selectionIsTransient

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

		const handleClick = useCallback(() => {
			if (isSelectable) {
				select(date)
				highlight(date)
			}
		}, [date, isSelectable, select, highlight])

		const handleKeyDown = useCallback(
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
					highlight(date.add({ months: -1 }))
				} else if (event.code === 'Home') {
					highlight(date.with({ day: 1 }))
				} else if (event.code === 'End') {
					highlight(date.with({ day: date.daysInMonth }))
				}
			},
			[date, isSelectable, select, highlight]
		)

		const handlePointerOver = useCallback(() => {
			if (shouldFocusOnPointerOver) {
				highlight(date)
			}
		}, [date, shouldFocusOnPointerOver, highlight])

		useLayoutEffect(() => {
			if (shouldFocus) {
				ref.current?.focus()
			}
		}, [shouldFocus])

		return (
			<poly.div
				ref={refComposed}
				role="button"
				tabIndex={isTabbable ? 0 : -1}
				data-day
				data-today={toData(isToday)}
				data-weekend={toData(isWeekend)}
				data-focused={toData(isFocused)}
				data-overflow={toData(isOverflow)}
				data-disabled={toData(isDisabled)}
				data-selected={toData(isSelected)}
				data-week-start={toData(isWeekStart)}
				data-week-end={toData(isWeekEnd)}
				data-range-start={toData(isRangeStart)}
				data-range-between={toData(isRangeBetween)}
				data-range-end={toData(isRangeEnd)}
				aria-label={label}
				aria-pressed={isSelected}
				aria-disabled={isDisabled || isReadOnly}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				onPointerOver={handlePointerOver}
				{...otherProps}
			>
				{children ?? date.day}
			</poly.div>
		)
	}
)
