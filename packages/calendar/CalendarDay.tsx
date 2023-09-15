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
import {
	isAfter,
	isBefore,
	isBetween,
	isEndOfWeek,
	isEquals,
	isEqualsToTheMonth,
	isStartOfWeek,
	isToday as isTodayFn,
	isWeekend as isWeekendFn,
	toClamp,
	type CalendarDate
} from './CalendarDate'

export type CalendarDayProps = CoreProps<
	'div',
	{
		date: CalendarDate
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
			range,
			readOnly,
			selection,
			selectionIsTransient,
			setHighlighted,
			setSelection
		} = useCalendarContext()
		const { names } = useCalendarLocalisation(locale)

		const isRange = range && isRangeCheck(selection)
		const isSingle = !range && isSet(selection)
		const isToday = isTodayFn(date)
		const isWeekEnd = isEndOfWeek(date, locale)
		const isWeekStart = isStartOfWeek(date, locale)
		const isWeekend = isWeekendFn(date, locale)
		const isOverflow = !isEqualsToTheMonth(date, highlighted)
		const isHighlighted = isEquals(date, highlighted)
		const isDisabled =
			disabledProp ||
			disabledContext ||
			(disabledIfWeekend && isWeekend) ||
			(disabledIfOverflow && isOverflow) ||
			Boolean(max && isAfter(date, max)) ||
			Boolean(min && isBefore(date, min))

		const isRangeEnd = isRange && isEquals(date, selection[1])
		const isRangeStart = isRange && isEquals(date, selection[0])
		const isRangeBetween =
			isRange && isBetween(date, selection[0], selection[1])

		const isTabbable = !isDisabled && isHighlighted
		const isSelectable = !isDisabled && !readOnly
		const isSelected =
			isRangeEnd || isRangeStart || (isSingle && date.equals(selection))

		const shouldGrabFocus = focusWithin && isHighlighted

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

		const setHighlightedClamp = useCallback(
			(action: Parameters<typeof setHighlighted>[0]) => {
				setHighlighted((prev) =>
					toClamp(
						isFunction(action) ? action(prev) : action,
						min,
						max
					)
				)
			},
			[min, max, setHighlighted]
		)

		const handleOver = useCallback(() => {
			if (isSelectable && selectionIsTransient) {
				setHighlighted(date)
			}
		}, [date, isSelectable, selectionIsTransient, setHighlighted])

		const handleBlur = useCallback(() => {
			if (isSelectable && isHighlighted && selectionIsTransient) {
				setSelection(date)
			}
		}, [
			date,
			isSelectable,
			isHighlighted,
			selectionIsTransient,
			setSelection
		])

		const handleSelect = useCallback(() => {
			if (isSelectable) {
				setSelection(date)
				setHighlighted(date)
			}
		}, [date, isSelectable, setSelection, setHighlighted])

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
					setHighlightedClamp((prev) => prev.subtract({ days: 7 }))
				}

				if (event.code === 'ArrowRight') {
					setHighlightedClamp((prev) =>
						prev.subtract({
							days: isRTL(event.target) ? 1 : -1
						})
					)
				}

				if (event.code === 'ArrowDown') {
					setHighlightedClamp((prev) => prev.add({ days: 7 }))
				}

				if (event.key === 'ArrowLeft') {
					setHighlightedClamp((prev) =>
						prev.add({
							days: isRTL(event.target) ? 1 : -1
						})
					)
				}

				if (event.code === 'PageUp') {
					setHighlightedClamp((prev) => prev.subtract({ months: 1 }))
				}

				if (event.code === 'PageDown') {
					setHighlightedClamp((prev) => prev.add({ months: 1 }))
				}

				if (event.code === 'Home') {
					setHighlightedClamp((prev) => prev.with({ day: 1 }))
				}

				if (event.code === 'End') {
					setHighlightedClamp((prev) =>
						prev.with({ day: prev.daysInMonth })
					)
				}
			},
			[handleSelect, setHighlightedClamp]
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
