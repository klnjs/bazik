import {
	useRef,
	useMemo,
	useCallback,
	useLayoutEffect,
	type KeyboardEvent,
	type FocusEvent
} from 'react'
import {
	poly,
	forwardRef,
	toData,
	useRefComposed,
	type CoreProps
} from '@klnjs/core'
import { isDefined } from '@klnjs/assertion'
import { isElementRTL } from '@klnjs/dom'
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
} from '@klnjs/temporal'
import { useCalendarContext } from './CalendarContext'
import { useCalendarDayNames } from './useCalendarLocalisation'
import { useCalendarGridContext } from './CalendarGridContext'
import { isCalendarCell, type CalendarCellProps } from './CalendarCell'

export type CalendarCellDayProps = CoreProps<'div', CalendarCellProps>

export const CalendarCellDay = forwardRef<'div', CalendarCellDayProps>(
	({ type, date, children, ...otherProps }, forwardedRef) => {
		const ref = useRef<HTMLDivElement>(null)
		const refComposed = useRefComposed(ref, forwardedRef)

		const {
			disabled: disabledContext,
			focusWithin: isFocusWithin,
			highlighted,
			locale,
			max,
			min,
			readOnly: isReadOnly,
			selectionIsTransient,
			selectionMode,
			selectionVisible,
			setFocusWithin,
			updateSelection,
			updateHighlighted
		} = useCalendarContext()
		const { month } = useCalendarGridContext()
		const { names: dayNames } = useCalendarDayNames(locale)

		const isOne = selectionMode === 'one' && isDefined(selectionVisible)
		const isMany = selectionMode === 'many' && isDefined(selectionVisible)
		const isRange = selectionMode === 'range' && isDefined(selectionVisible)

		const isToday = isTodayFn(date)
		const isActive = isSameDay(date, highlighted)
		const isWeekend = isWeekendFn(date, locale)
		const isWeekEnd = isEndOfWeek(date, locale)
		const isWeekStart = isStartOfWeek(date, locale)
		const isOverflow = !isSameMonth(date, month.toPlainDate({ day: 1 }))
		const isFocused = isFocusWithin && isActive
		const isDisabled =
			disabledContext ||
			Boolean(max && isAfter(date, max)) ||
			Boolean(min && isBefore(date, min))

		const isRangeEnd = isRange && isSameDay(date, selectionVisible[1])
		const isRangeStart = isRange && isSameDay(date, selectionVisible[0])
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
				updateSelection(date)
				updateHighlighted(date)
			}
		}, [date, isSelectable, updateSelection, updateHighlighted])

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
					updateSelection(date)
				} else if (event.code === 'ArrowUp') {
					updateHighlighted(date.add({ weeks: -1 }))
				} else if (event.code === 'ArrowRight') {
					updateHighlighted(
						date.add({
							days: isElementRTL(event.target as HTMLElement)
								? -1
								: 1
						})
					)
				} else if (event.code === 'ArrowDown') {
					updateHighlighted(date.add({ weeks: 1 }))
				} else if (event.key === 'ArrowLeft') {
					updateHighlighted(
						date.add({
							days: isElementRTL(event.target as HTMLElement)
								? 1
								: -1
						})
					)
				} else if (event.code === 'PageUp') {
					updateHighlighted(date.add({ months: 1 }))
				} else if (event.code === 'PageDown') {
					updateHighlighted(date.add({ months: -1 }))
				} else if (event.code === 'Home') {
					updateHighlighted(date.with({ day: 1 }))
				} else if (event.code === 'End') {
					updateHighlighted(date.with({ day: date.daysInMonth }))
				}
			},
			[date, isSelectable, updateSelection, updateHighlighted]
		)

		const handlePointerOver = useCallback(() => {
			if (shouldFocusOnPointerOver) {
				updateHighlighted(date)
			}
		}, [date, shouldFocusOnPointerOver, updateHighlighted])

		const handleFocus = useCallback(() => {
			setFocusWithin(true)
		}, [])

		const handleBlur = useCallback((event: FocusEvent) => {
			if (!isCalendarCell(event.relatedTarget as HTMLElement, 'day')) {
				setFocusWithin(false)
			}
		}, [])

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
				data-week-end={toData(isWeekEnd)}
				data-week-start={toData(isWeekStart)}
				data-range-end={toData(isRangeEnd)}
				data-range-start={toData(isRangeStart)}
				data-range-between={toData(isRangeBetween)}
				aria-label={label}
				aria-pressed={isSelected}
				aria-disabled={isDisabled || isReadOnly}
				onBlur={handleBlur}
				onFocus={handleFocus}
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
