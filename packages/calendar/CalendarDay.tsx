import { useCallback, type KeyboardEvent, useEffect } from 'react'
import {
	freya,
	forwardRef,
	useForwardedRef,
	type AsChildComponentProps
} from '../core'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDate } from './CalendarDate'

export type CalendarDayProps = AsChildComponentProps<
	'button',
	{
		date: CalendarDate
		disabled?: boolean
	}
>

export const CalendarDay = forwardRef<'button', CalendarDayProps>(
	({ date, disabled, ...otherProps }, forwardedRef) => {
		const {
			autoFocus,
			minDate,
			maxDate,
			focusedDate,
			selectedDate,
			setFocusedDate,
			setSelectedDate
		} = useCalendarContext()

		const isToday = date.isToday()
		const isAfter = Boolean(maxDate && date.isAfter(maxDate))
		const isBefore = Boolean(minDate && date.isBefore(minDate))
		const isWeekend = date.isWeekend()
		const isFocused = date.isSameDay(focusedDate)
		const isSelected = Boolean(selectedDate && date.isSameDay(selectedDate))
		const isOverflow = !date.isSameMonth(focusedDate)
		const isDisabled = disabled ?? (isAfter || isBefore)

		const ref = useForwardedRef(forwardedRef)
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

		const handleClick = useCallback(() => {
			if (!isDisabled) {
				setFocusedDate(date)
				setSelectedDate(date)
			}
		}, [date, isDisabled, setFocusedDate, setSelectedDate])

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLButtonElement>) => {
				if (event.code !== 'Tab') {
					event.preventDefault()
				}

				if (event.code === 'Enter' || event.code === 'Space') {
					handleClick()
				}

				if (event.code === 'ArrowUp') {
					setFocusedDate((prev) => prev.sub({ day: 7 }))
				}

				if (event.code === 'ArrowRight') {
					setFocusedDate((prev) => prev.add({ day: 1 }))
				}

				if (event.code === 'ArrowDown') {
					setFocusedDate((prev) => prev.add({ day: 7 }))
				}

				if (event.key === 'ArrowLeft') {
					setFocusedDate((prev) => prev.sub({ day: 1 }))
				}

				if (event.code === 'PageUp') {
					setFocusedDate((prev) => prev.sub({ month: 1 }))
				}

				if (event.code === 'PageDown') {
					setFocusedDate((prev) => prev.add({ month: 1 }))
				}

				if (event.code === 'Home') {
					setFocusedDate((prev) => prev.getFirstDateOfMonth())
				}

				if (event.code === 'End') {
					setFocusedDate((prev) => prev.getLastDateOfMonth())
				}
			},
			[setFocusedDate, handleClick]
		)

		// This currently grabs focus at incorrect times
		useEffect(() => {
			if (isFocused) {
				ref.current?.focus({
					// @ts-expect-error not yet implemented
					// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
					focusVisible: true
				})
			}
		}, [ref, isFocused])

		return (
			<freya.button
				ref={ref}
				tabIndex={isFocused ? 0 : -1}
				autoFocus={isFocused && autoFocus ? true : undefined}
				data-today={isToday ? '' : undefined}
				data-focused={isFocused ? '' : undefined}
				data-weekend={isWeekend ? '' : undefined}
				data-overflow={isOverflow ? '' : undefined}
				data-disabled={isDisabled ? '' : undefined}
				data-selected={isSelected ? '' : undefined}
				aria-label={label}
				aria-selected={isSelected}
				aria-disabled={isDisabled}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				{...otherProps}
			/>
		)
	}
)
