import {
	useRef,
	useMemo,
	useLayoutEffect,
	type KeyboardEvent,
	type FocusEvent
} from 'react'
import { poly, asDataProp, useRefComposed, type PolyProps } from '@klnjs/core'
import { isDefined } from '@klnjs/assertion'
import { plainDate } from '@klnjs/temporal'
import { isElementRTL } from '@klnjs/dom'
import { useCalendarContext } from './CalendarContext'
import { useCalendarGridContext } from './CalendarGridContext'
import { useCalendarLocalisation } from './useCalendarLocalisation'
import { isCalendarCell, type CalendarCellProps } from './CalendarCell'
import { createVisibleRange } from './useCalendarVisibleRange'
import type { PlainDate } from './CalendarTypes'

export type CalendarCellDayProps = PolyProps<'div', CalendarCellProps>

export const CalendarCellDay = ({
	ref: refProp,
	type,
	date,
	children,
	...otherProps
}: CalendarCellDayProps) => {
	const ref = useRef<HTMLDivElement>(null)
	const refComposed = useRefComposed(ref, refProp)

	const {
		calendar,
		disabled: disabledContext,
		focusWithin: isFocusWithin,
		highlighted,
		locale,
		max,
		min,
		pagination,
		readOnly: isReadOnly,
		selectionIsTransient,
		selectionMode,
		selectionVisible,
		visibleDuration,
		visibleRange,
		setSelection,
		setHighlighted,
		setFocusWithin,
		setVisibleRange
	} = useCalendarContext()
	const { month } = useCalendarGridContext()
	const { dayNames } = useCalendarLocalisation(locale)

	const isOne = selectionMode === 'one' && isDefined(selectionVisible)
	const isMany = selectionMode === 'many' && isDefined(selectionVisible)
	const isRange = selectionMode === 'range' && isDefined(selectionVisible)

	const isActive = plainDate.isEquals(date, highlighted)
	const isToday = plainDate.isToday(date)
	const isTommorow = plainDate.isTommorow(date)
	const isYesterday = plainDate.isYesterday(date)
	const isWeekend = plainDate.isWeekend(date, locale)
	const isWeekEnd = plainDate.isEndOfWeek(date, locale)
	const isWeekStart = plainDate.isStartOfWeek(date, locale)
	const isOverflow = !plainDate.isSameMonth(
		date,
		month.toPlainDate({ day: 1 })
	)
	const isFocused = isFocusWithin && isActive
	const isDisabled =
		disabledContext ||
		(isDefined(min) && plainDate.isBefore(date, min)) ||
		(isDefined(max) && plainDate.isAfter(date, max))

	const isRangeEnd = isRange && plainDate.isEquals(date, selectionVisible[1])
	const isRangeStart =
		isRange && plainDate.isEquals(date, selectionVisible[0])
	const isRangeBetween =
		isRange &&
		plainDate.isBetween(date, selectionVisible[0], selectionVisible[1])

	const isTabbable = !isDisabled && isActive
	const isSelectable = !isDisabled && !isReadOnly
	const isSelected =
		(isOne && plainDate.isEquals(date, selectionVisible)) ||
		(isMany && selectionVisible.some((d) => plainDate.isEquals(date, d))) ||
		(isRange && (isRangeEnd || isRangeStart))

	const shouldFocus = isFocused
	const shouldFocusOnPointerOver = isSelectable && selectionIsTransient

	const label = useMemo(() => {
		const name = isToday
			? 'today'
			: isYesterday
				? 'yesterday'
				: isTommorow
					? 'tommorow'
					: undefined

		const formatted = date.toLocaleString(locale, {
			calendar,
			year: 'numeric',
			month: 'long',
			weekday: 'long',
			day: 'numeric'
		})

		return name ? `${dayNames.of(name)}, ${formatted}` : formatted
	}, [date, calendar, locale, dayNames, isToday, isYesterday, isTommorow])

	const content = children ?? date.day

	const select = (target: PlainDate) => {
		setSelection(target)
		setHighlighted(target)
	}

	const highlight = (target: PlainDate) => {
		const result = plainDate.clamp(target, min, max)
		const visible = plainDate.isBetweenInclusive(result, ...visibleRange)
		const range = visible
			? visibleRange
			: createVisibleRange({
					date: result,
					span: visibleDuration,
					align: (plainDate.compare(result, highlighted) *
						(pagination === 'single' ? -1 : 1)) as -1 | 0 | 1
				})

		setHighlighted(result)
		setVisibleRange(range)
	}

	const handleBlur = (event: FocusEvent) => {
		if (!isCalendarCell(event.relatedTarget as HTMLElement, 'day')) {
			setFocusWithin(false)
		}
	}

	const handleFocus = () => {
		setFocusWithin(true)
	}

	const handleClick = () => {
		if (isSelectable) {
			select(date)
		}
	}

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.code !== 'Tab') {
			event.preventDefault()
		}

		if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
			return
		}

		if (event.code === 'Enter' || event.code === 'Space') {
			if (isSelectable) {
				select(date)
			}
		} else if (event.code === 'ArrowUp') {
			highlight(date.subtract({ weeks: 1 }))
		} else if (event.code === 'ArrowRight') {
			if (isElementRTL(event.target as HTMLElement)) {
				highlight(date.subtract({ days: 1 }))
			} else {
				highlight(date.add({ days: 1 }))
			}
		} else if (event.code === 'ArrowDown') {
			highlight(date.add({ weeks: 1 }))
		} else if (event.key === 'ArrowLeft') {
			if (isElementRTL(event.target as HTMLElement)) {
				highlight(date.add({ days: 1 }))
			} else {
				highlight(date.subtract({ days: 1 }))
			}
		} else if (event.code === 'PageUp') {
			highlight(date.subtract({ months: 1 }))
		} else if (event.code === 'PageDown') {
			highlight(date.add({ months: 1 }))
		} else if (event.code === 'Home') {
			highlight(date.with({ day: 1 }))
		} else if (event.code === 'End') {
			highlight(date.with({ day: date.daysInMonth }))
		}
	}

	const handlePointerOver = () => {
		if (shouldFocusOnPointerOver) {
			setHighlighted(date)
		}
	}

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
			data-cell="day"
			data-today={asDataProp(isToday)}
			data-tommorow={asDataProp(isTommorow)}
			data-yesterday={asDataProp(isYesterday)}
			data-weekend={asDataProp(isWeekend)}
			data-focused={asDataProp(isFocused)}
			data-overflow={asDataProp(isOverflow)}
			data-disabled={asDataProp(isDisabled)}
			data-selected={asDataProp(isSelected)}
			data-week-end={asDataProp(isWeekEnd)}
			data-week-start={asDataProp(isWeekStart)}
			data-range-end={asDataProp(isRangeEnd)}
			data-range-start={asDataProp(isRangeStart)}
			data-range-between={asDataProp(isRangeBetween)}
			aria-label={label}
			aria-pressed={isSelected}
			aria-disabled={!isSelectable}
			onBlur={handleBlur}
			onFocus={handleFocus}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			onPointerOver={handlePointerOver}
			{...otherProps}
		>
			{content}
		</poly.div>
	)
}
