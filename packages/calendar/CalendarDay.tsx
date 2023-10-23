import {
	useRef,
	useMemo,
	useEffect,
	useCallback,
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
import { useCalendarMonthContext } from './CalendarMonthContext'

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
			highlighted,
			locale,
			max,
			min,
			readOnly,
			selection,
			selectionMode,
			selectionIsTransient,
			setSelection,
			setHighlighted
		} = useCalendarContext()
		const { year, month } = useCalendarMonthContext()
		const { names } = useCalendarLocalisation(locale)

		const isOne = selectionMode === 'one' && isSet(selection)
		const isMany = selectionMode === 'many' && isSet(selection)
		const isRange = selectionMode === 'range' && isSet(selection)

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

		const isRangeEnd = isRange && date.equals(selection[1])
		const isRangeStart = isRange && date.equals(selection[0])
		const isRangeBetween =
			isRange && isBetween(date, selection[0], selection[1])

		const isFocusable = !isDisabled
		const isTabbable = isFocusable && isHighlighted
		const isSelectable = isFocusable && !readOnly
		const isSelected =
			(isOne && date.equals(selection)) ||
			(isMany && selection.some((s) => date.equals(s))) ||
			(isRange && (isRangeEnd || isRangeStart))

		const shouldGrabFocus = focusWithin && isHighlighted
		const shouldLightOnOver = selectionIsTransient && isSelectable
		const shouldSelectOnBlur = shouldLightOnOver && isHighlighted

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

		const handleBlur = useCallback(() => {
			if (shouldSelectOnBlur) {
				setSelection(date)
			}
		}, [date, shouldSelectOnBlur, setSelection])

		const handleOver = useCallback(() => {
			if (shouldLightOnOver) {
				setHighlighted(date)
			}
		}, [date, shouldLightOnOver, setHighlighted])

		const handleSelect = useCallback(() => {
			if (isSelectable) {
				setSelection(date)
				setHighlighted(date)
			}
		}, [date, isSelectable, setSelection, setHighlighted])

		const handleHighlight = useCallback(
			(action: Parameters<typeof setHighlighted>[0]) => {
				if (isFocusable) {
					setHighlighted(action)
				}
			},
			[isFocusable, setHighlighted]
		)

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
					handleSelect()
				}

				if (event.code === 'ArrowUp') {
					handleHighlight((prev) => prev.subtract({ days: 7 }))
				}

				if (event.code === 'ArrowRight') {
					handleHighlight((prev) =>
						prev.subtract({
							days: isRTL(event.target) ? 1 : -1
						})
					)
				}

				if (event.code === 'ArrowDown') {
					handleHighlight((prev) => prev.add({ days: 7 }))
				}

				if (event.key === 'ArrowLeft') {
					handleHighlight((prev) =>
						prev.add({
							days: isRTL(event.target) ? 1 : -1
						})
					)
				}

				if (event.code === 'PageUp') {
					handleHighlight((prev) => prev.subtract({ months: 1 }))
				}

				if (event.code === 'PageDown') {
					handleHighlight((prev) => prev.add({ months: 1 }))
				}

				if (event.code === 'Home') {
					handleHighlight((prev) => prev.with({ day: 1 }))
				}

				if (event.code === 'End') {
					handleHighlight((prev) =>
						prev.with({ day: prev.daysInMonth })
					)
				}
			},
			[handleSelect, handleHighlight]
		)

		useEffect(() => {
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
				onBlur={handleBlur}
				onClick={handleSelect}
				onKeyDown={handleKeyboard}
				onPointerOver={handleOver}
				{...otherProps}
			>
				{children ?? date.day}
			</freya.div>
		)
	}
)
