import { useEffect, useCallback, type KeyboardEvent, useRef } from 'react'
import { freya, forwardRef, useMergeRefs, type CoreProps } from '../core'
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
			autoFocus,
			setAutoFocus,
			minDate,
			maxDate,
			disabled: disabledContext,
			focusedDate,
			setFocusedDate,
			selectedDate,
			setSelectedDate
		} = useCalendarContext()

		const isToday = date.isToday()
		const isWeekend = date.isWeekend()
		const isFocused = date.isSameDay(focusedDate)
		const isOverflow = !date.isSameMonth(focusedDate)
		const isSelected = Boolean(selectedDate && date.isSameDay(selectedDate))
		const isDisabled =
			disabledProp ||
			disabledContext ||
			Boolean(maxDate && date.isAfter(maxDate)) ||
			Boolean(minDate && date.isBefore(minDate))

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

		const handleClick = useCallback(() => {
			setFocusedDate(date, true)
			setSelectedDate(date)
		}, [date, setFocusedDate, setSelectedDate])

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLButtonElement>) => {
				if (event.code !== 'Tab') {
					event.preventDefault()
				}

				if (event.code === 'Enter' || event.code === 'Space') {
					handleClick()
				}

				if (event.code === 'ArrowUp') {
					setFocusedDate((prev) => prev.sub({ day: 7 }), true)
				}

				if (event.code === 'ArrowRight') {
					setFocusedDate(
						(prev) =>
							prev.add({
								day: findDayChange(ref.current)
							}),
						true
					)
				}

				if (event.code === 'ArrowDown') {
					setFocusedDate((prev) => prev.add({ day: 7 }), true)
				}

				if (event.key === 'ArrowLeft') {
					setFocusedDate(
						(prev) =>
							prev.sub({
								day: findDayChange(ref.current)
							}),
						true
					)
				}

				if (event.code === 'PageUp') {
					setFocusedDate((prev) => prev.sub({ month: 1 }), true)
				}

				if (event.code === 'PageDown') {
					setFocusedDate((prev) => prev.add({ month: 1 }), true)
				}

				if (event.code === 'Home') {
					setFocusedDate((prev) => prev.getFirstDateOfMonth(), true)
				}

				if (event.code === 'End') {
					setFocusedDate((prev) => prev.getLastDateOfMonth(), true)
				}
			},
			[handleClick, setFocusedDate]
		)

		useEffect(() => {
			if (isFocused && autoFocus) {
				setAutoFocus(false)
				ref.current?.focus({
					// @ts-expect-error not yet implemented
					// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
					focusVisible: true
				})
			}
		}, [isFocused, autoFocus, setAutoFocus])

		return (
			<freya.button
				ref={refCallback}
				role="gridcell"
				disabled={isDisabled}
				tabIndex={isFocused ? 0 : -1}
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

const findDayChange = (element: HTMLElement | null) => {
	const target = element ?? document.body

	return getComputedStyle(target).direction === 'rtl' ? -1 : 1
}
