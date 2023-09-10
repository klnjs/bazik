import {
	useRef,
	useMemo,
	useEffect,
	useCallback,
	type KeyboardEvent
} from 'react'
import {
	freya,
	forwardRef,
	useMergeRefs,
	toData,
	isRTL,
	isSet,
	isRange as isRangeCheck,
	isFunction,
	type CoreProps
} from '../core'
import { useCalendarContext } from './CalendarContext'
import { useCalendarLocalisation } from './useCalendarLocalisation'
import type { CalendarDate } from './CalendarDate'
import * as fns from './CalendarHelpers'

export type CalendarDayProps = CoreProps<
	'button',
	{
		date: CalendarDate
		disabled?: boolean
		disabledIfWeekend?: boolean
		disabledIfOverflow?: boolean
	}
>

export const CalendarDay = forwardRef<'button', CalendarDayProps>(
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
		const {
			min,
			max,
			range,
			locale,
			disabled: disabledContext,
			autoFocus,
			setAutoFocus,
			selection,
			selectionIsTransient,
			setSelection,
			highlighted,
			setHighlighted
		} = useCalendarContext()
		const { names } = useCalendarLocalisation(locale)

		const isRange = range && isRangeCheck(selection)
		const isSingle = !range && isSet(selection)
		const isToday = fns.isToday(date)
		const isWeekEnd = fns.isEndOfWeek(date, locale)
		const isWeekStart = fns.isStartOfWeek(date, locale)
		const isWeekend = fns.isWeekend(date, locale)
		const isOverflow = !fns.isEqualsMonth(date, highlighted)
		const isHighlighted = fns.isEquals(date, highlighted)
		const isDisabled =
			disabledProp ||
			disabledContext ||
			(disabledIfWeekend && isWeekend) ||
			(disabledIfOverflow && isOverflow) ||
			Boolean(max && fns.isAfter(date, max)) ||
			Boolean(min && fns.isBefore(date, min))

		const isRangeEnd = isRange && fns.isEquals(date, selection[1])
		const isRangeStart = isRange && fns.isEquals(date, selection[0])
		const isRangeBetween =
			isRange && fns.isBetween(date, selection[0], selection[1])

		const isSelected =
			isRangeEnd || isRangeStart || (isSingle && date.equals(selection))

		const ref = useRef<HTMLButtonElement>(null)
		const refCallback = useMergeRefs(ref, forwardedRef)

		const label = useMemo(() => {
			const formatted = date.toLocaleString(locale, {
				year: 'numeric',
				month: 'long',
				weekday: 'long',
				day: 'numeric'
			})

			if (isToday) {
				// Uncertain how this works in different locales, due to
				// the concatenation of the two labels.
				return `${names.of('today')}, ${formatted}`
			}

			return formatted
		}, [locale, date, names, isToday])

		const setHighlightedAndFocus = useCallback(
			(action: Parameters<typeof setHighlighted>[0]) => {
				setAutoFocus(true)
				setHighlighted((prev) =>
					fns.toClamp(
						isFunction(action) ? action(prev) : action,
						min,
						max
					)
				)
			},
			[min, max, setAutoFocus, setHighlighted]
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
					setHighlightedAndFocus((prev) => prev.subtract({ days: 7 }))
				}

				if (event.code === 'ArrowRight') {
					setHighlightedAndFocus((prev) =>
						prev.subtract({
							days: isRTL(event.target) ? 1 : -1
						})
					)
				}

				if (event.code === 'ArrowDown') {
					setHighlightedAndFocus((prev) => prev.add({ days: 7 }))
				}

				if (event.key === 'ArrowLeft') {
					setHighlightedAndFocus((prev) =>
						prev.add({
							days: isRTL(event.target) ? 1 : -1
						})
					)
				}

				if (event.code === 'PageUp') {
					setHighlightedAndFocus((prev) =>
						prev.subtract({ months: 1 })
					)
				}

				if (event.code === 'PageDown') {
					setHighlightedAndFocus((prev) => prev.add({ months: 1 }))
				}

				if (event.code === 'Home') {
					setHighlightedAndFocus((prev) => prev.with({ day: 1 }))
				}

				if (event.code === 'End') {
					setHighlightedAndFocus((prev) =>
						prev.with({ day: prev.daysInMonth })
					)
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
		}, [isHighlighted, highlighted, autoFocus, setAutoFocus])

		return (
			<freya.button
				ref={refCallback}
				tabIndex={isHighlighted ? 0 : -1}
				data-today={toData(isToday)}
				data-weekend={toData(isWeekend)}
				data-week-start={toData(isWeekStart)}
				data-week-end={toData(isWeekEnd)}
				data-overflow={toData(isOverflow)}
				data-disabled={toData(isDisabled)}
				data-selected={toData(isSelected)}
				data-range-end={toData(isRangeEnd)}
				data-range-start={toData(isRangeStart)}
				data-range-between={toData(isRangeBetween)}
				data-highlighted={toData(isHighlighted)}
				aria-label={label}
				aria-selected={isSelected}
				aria-disabled={isDisabled}
				onBlur={handleBlur}
				onClick={handleSelect}
				onKeyDown={handleKeyboard}
				onPointerOver={handleOver}
				{...otherProps}
			>
				{children ?? date.day}
			</freya.button>
		)
	}
)
