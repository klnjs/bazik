import {
	useRef,
	useMemo,
	useEffect,
	useCallback,
	type KeyboardEvent
} from 'react'
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
	(
		{ date, disabled: disabledProp = false, children, ...otherProps },
		forwardedRef
	) => {
		const {
			locale,
			disabled: disabledContext,
			minDate,
			maxDate,
			autoFocus,
			setAutoFocus,
			selection,
			selectionIsTransient,
			setSelection,
			highlighted,
			setHighlighted
		} = useCalendarContext()

		const isToday = date.isToday()
		const isRange = Array.isArray(selection)
		const isSingle = !isRange && selection !== null
		const isWeekStart = date.getWeekDay(locale) === 1
		const isWeekEnd = date.getWeekDay(locale) === 7
		const isWeekend = date.isWeekend(locale)
		const isOverflow = !date.isSameMonth(highlighted)
		const isHighlighted = date.isSameDay(highlighted)
		const isDisabled =
			disabledProp ||
			disabledContext ||
			Boolean(maxDate && date.isAfter(maxDate)) ||
			Boolean(minDate && date.isBefore(minDate))

		if (date.getDay() === 18) {
			console.log(date.toDate().toString())
			console.log(
				minDate?.toDate().toString(),
				' - ',
				maxDate?.toDate().toString()
			)
		}

		const isRangeStart = isRange && date.isSameDay(selection[0])
		const isRangeEnd = isRange && date.isSameDay(selection[1])
		const isRangeIn =
			!isRangeStart &&
			!isRangeEnd &&
			isRange &&
			date.isBetween(selection[0], selection[1])

		const isSelected =
			isRangeStart ||
			isRangeEnd ||
			(isSingle && date.isSameDay(selection))

		const ref = useRef<HTMLButtonElement>(null)
		const refCallback = useMergeRefs(ref, forwardedRef)

		const label = useMemo(() => {
			const formatted = date.format(locale, {
				year: 'numeric',
				month: 'long',
				weekday: 'long',
				day: 'numeric'
			})

			if (isToday) {
				// Uncertain how this works in different locales, due to
				// the concatenation of the two labels.
				return `${date.formatRelativeTo(locale, date, 'day', {
					numeric: 'auto'
				})}, ${formatted}`
			}

			return formatted
		}, [locale, date, isToday])

		const setHighlightedAndFocus = useCallback(
			(action: Parameters<typeof setHighlighted>[0]) => {
				setAutoFocus(true)
				setHighlighted((prev) => {
					if (typeof action === 'function') {
						return action(prev).clamp(minDate, maxDate)
					}

					return action.clamp(minDate, maxDate)
				})
			},
			[minDate, maxDate, setAutoFocus, setHighlighted]
		)

		const handleOver = useCallback(() => {
			if (!isDisabled && selectionIsTransient) {
				setHighlightedAndFocus(date)
			}
		}, [date, isDisabled, selectionIsTransient, setHighlightedAndFocus])

		const handleBlur = useCallback(() => {
			if (!isDisabled && isHighlighted && selectionIsTransient) {
				setSelection(date)
			}
		}, [
			date,
			isDisabled,
			isHighlighted,
			selectionIsTransient,
			setSelection
		])

		const handleSelect = useCallback(() => {
			if (!isDisabled) {
				setSelection(date)
				setHighlightedAndFocus(date)
			}
		}, [date, isDisabled, setSelection, setHighlightedAndFocus])

		const handleKeyboard = useCallback(
			(event: KeyboardEvent<HTMLButtonElement>) => {
				if (event.code !== 'Tab') {
					event.preventDefault()
				}

				if (event.code === 'Enter' || event.code === 'Space') {
					handleSelect()
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
			[handleSelect, setHighlightedAndFocus]
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
				onBlur={handleBlur}
				onClick={handleSelect}
				onKeyDown={handleKeyboard}
				onPointerOver={handleOver}
				{...otherProps}
			>
				{children ?? date.getDay()}
			</freya.button>
		)
	}
)
