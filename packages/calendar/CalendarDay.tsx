import { useEffect, useCallback, type KeyboardEvent, useRef } from 'react'
import { freya, forwardRef, useMergeRefs, isRTL, type CoreProps } from '../core'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDate } from './CalendarDate'

export type CalendarDayProps = CoreProps<
	'button',
	{
		date: CalendarDate
		disabled?: boolean
	}
>

export const CalendarDay = forwardRef<'button', CalendarDayProps>(
	({ date, disabled: disabledProp = false, ...otherProps }, forwardedRef) => {
		const {
			range: isRange,
			disabled: disabledContext,
			minDate,
			maxDate,
			autoFocus,
			setAutoFocus,
			selected,
			setSelected,
			highlighted,
			setHighlighted
		} = useCalendarContext()

		const isToday = date.isToday()
		const isWeekStart = date.getWeekDay() === 1
		const isWeekEnd = date.getWeekDay() === 7
		const isWeekend = date.isWeekend()
		const isOverflow = !date.isSameMonth(highlighted)
		const isHighlighted = date.isSameDay(highlighted)
		const isDisabled =
			disabledProp ||
			disabledContext ||
			Boolean(maxDate && date.isAfter(maxDate)) ||
			Boolean(minDate && date.isBefore(minDate))

		const isRangeStart =
			isRange && Boolean(selected && date.isSameDay(selected[0]))

		const isRangeEnd =
			isRange && Boolean(selected && date.isSameDay(selected[1]))

		const isRangeIn =
			!isRangeStart &&
			!isRangeEnd &&
			isRange &&
			Boolean(selected && date.isBetween(selected[0], selected[1]))

		const isSelected =
			isRangeStart ||
			isRangeEnd ||
			(!isRange && Boolean(selected && date.isSameDay(selected)))

		const ref = useRef<HTMLButtonElement>(null)
		const refCallback = useMergeRefs(ref, forwardedRef)

		const formatted = date.format({
			year: 'numeric',
			month: 'long',
			weekday: 'long',
			day: 'numeric'
		})

		// Uncertain how this works in different locales, due to
		// the concatenation of the two labels.
		const label = isToday
			? `${date.formatRelative(date, 'day', {
					numeric: 'auto'
			  })}, ${formatted}`
			: formatted

		const setHighlightedAndFocus = useCallback(
			(action: Parameters<typeof setHighlighted>[0]) => {
				setAutoFocus(true)
				setHighlighted(action)
			},
			[setAutoFocus, setHighlighted]
		)

		const handleClick = useCallback(() => {
			if (!isDisabled) {
				setSelected(date)
				setHighlightedAndFocus(date)
			}
		}, [date, isDisabled, setSelected, setHighlightedAndFocus])

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLButtonElement>) => {
				if (event.code !== 'Tab') {
					event.preventDefault()
				}

				if (event.code === 'Enter' || event.code === 'Space') {
					handleClick()
				}

				if (event.code === 'ArrowUp') {
					setHighlightedAndFocus((prev) => prev.sub({ day: 7 }))
				}

				if (event.code === 'ArrowRight') {
					setHighlightedAndFocus((prev) =>
						prev.sub({
							day: isRTL(event.target) ? 1 : -1
						})
					)
				}

				if (event.code === 'ArrowDown') {
					setHighlightedAndFocus((prev) => prev.add({ day: 7 }))
				}

				if (event.key === 'ArrowLeft') {
					setHighlightedAndFocus((prev) =>
						prev.add({
							day: isRTL(event.target) ? 1 : -1
						})
					)
				}

				if (event.code === 'PageUp') {
					setHighlightedAndFocus((prev) => prev.sub({ month: 1 }))
				}

				if (event.code === 'PageDown') {
					setHighlightedAndFocus((prev) => prev.add({ month: 1 }))
				}

				if (event.code === 'Home') {
					setHighlightedAndFocus((prev) => prev.getFirstDateOfMonth())
				}

				if (event.code === 'End') {
					setHighlightedAndFocus((prev) => prev.getLastDateOfMonth())
				}
			},
			[handleClick, setHighlightedAndFocus]
		)

		useEffect(() => {
			if (isHighlighted && autoFocus) {
				setAutoFocus(false)
				ref.current?.focus({
					// @ts-expect-error not yet implemented
					// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
					focusVisible: true
				})
			}
		}, [isHighlighted, autoFocus, setAutoFocus])

		return (
			<freya.button
				ref={refCallback}
				tabIndex={isHighlighted ? 0 : -1}
				data-today={isToday ? '' : undefined}
				data-weekend={isWeekend ? '' : undefined}
				data-week-start={isWeekStart ? '' : undefined}
				data-week-end={isWeekEnd ? '' : undefined}
				data-overflow={isOverflow ? '' : undefined}
				data-disabled={isDisabled ? '' : undefined}
				data-selected={isSelected ? '' : undefined}
				data-range-in={isRangeIn ? '' : undefined}
				data-range-end={isRangeEnd ? '' : undefined}
				data-range-start={isRangeStart ? '' : undefined}
				data-highlighted={isHighlighted ? '' : undefined}
				aria-label={label}
				aria-selected={isSelected}
				aria-disabled={isDisabled}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				{...otherProps}
			>
				{date.getDay()}
			</freya.button>
		)
	}
)
