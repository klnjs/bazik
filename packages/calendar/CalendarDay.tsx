import {
	useRef,
	useEffect,
	useCallback,
	type KeyboardEvent,
	type MouseEvent
} from 'react'
import {
	freya,
	forwardRef,
	useForwardedRef,
	type AsChildComponentProps
} from '../core'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDate, CalendarDateMutation } from './CalendarDate'

export type CalendarDayProps = AsChildComponentProps<
	'div',
	{
		date: CalendarDate
		disabled?: boolean
		disabledOnWeekend?: boolean
		disabledOnOverflow?: boolean
	}
>

export const CalendarDay = forwardRef<'div', CalendarDayProps>(
	(
		{
			date,
			disabled,
			disabledOnOverflow = true,
			disabledOnWeekend,
			...otherProps
		},
		forwardedRef
	) => {
		const {
			state,
			config: { min, max, today, locale }
		} = useCalendarContext()
		const ref = useRef<HTMLDivElement>(null)

		const isToday = date.isToday()
		const isAfter = Boolean(max && date.isAfter(max))
		const isBefore = Boolean(min && date.isBefore(min))
		const isWeekend = date.isWeekend(locale)
		const isSelected = Boolean(state.date && date.isSameDay(state.date))
		const isOverflow = !date.isSameMonth(state.focusedDate)
		const isHighlighted = date.isSameDay(state.focusedDate)
		const isDisabled =
			disabled ||
			(disabledOnWeekend && isWeekend) ||
			(disabledOnOverflow && isOverflow) ||
			isAfter ||
			isBefore

		const formatted = date.format(locale, {
			year: 'numeric',
			month: 'long',
			weekday: 'long',
			day: 'numeric'
		})

		// Uncertain how this works in different locales, due to
		// the concatenation of the two labels.
		const label = isToday
			? `${today.formatRelative(locale, today, 'day', {
					numeric: 'auto'
			  })}, ${formatted}`
			: formatted

		const changeDate = useCallback(
			(
				event:
					| KeyboardEvent<HTMLDivElement>
					| MouseEvent<HTMLDivElement>
			) => {
				if (!isDisabled) {
					event.preventDefault()
					state.setOpen((prev) => !prev)
					state.setDate(date)
					state.setFocusedDate(date)
				}
			},
			[date, state, isDisabled]
		)

		const changeFocusedDate = useCallback(
			(
				event: KeyboardEvent<HTMLDivElement>,
				action: 'add' | 'sub',
				options: CalendarDateMutation
			) => {
				event.preventDefault()
				state.setFocusedDate((prev) => {
					const next = prev[action](options)
					const limit = action === 'add' ? max : min
					const check = action === 'add' ? 'isAfter' : 'isBefore'

					return limit && next[check](limit) ? limit : next
				})
			},
			[state, min, max]
		)

		const handleClick = changeDate

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLDivElement>) => {
				if (event.code === 'Enter' || event.code === 'Space') {
					changeDate(event)
				}

				if (event.code === 'ArrowUp') {
					changeFocusedDate(event, 'sub', { day: 7 })
				}

				if (event.code === 'ArrowRight') {
					changeFocusedDate(event, 'add', { day: 1 })
				}

				if (event.code === 'ArrowDown') {
					changeFocusedDate(event, 'add', { day: 7 })
				}

				if (event.key === 'ArrowLeft') {
					changeFocusedDate(event, 'sub', { day: 1 })
				}

				if (event.code === 'PageUp') {
					changeFocusedDate(event, 'sub', { month: 1 })
				}

				if (event.code === 'PageDown') {
					changeFocusedDate(event, 'add', { month: 1 })
				}

				if (event.code === 'Home') {
					state.setFocusedDate((prev) => prev.getFirstDateOfMonth())
				}

				if (event.code === 'End') {
					state.setFocusedDate((prev) => prev.getLastDateOfMonth())
				}
			},
			[state, changeDate, changeFocusedDate]
		)

		useForwardedRef(ref, forwardedRef)

		useEffect(() => {
			if (isHighlighted) {
				ref.current?.focus({
					// @ts-expect-error not yet implemented
					// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
					focusVisible: true
				})
			}
		}, [isHighlighted])

		return (
			<freya.div
				ref={ref}
				role='button'
				tabIndex={isHighlighted ? 0 : -1}
				data-today={isToday ? '' : undefined}
				data-weekend={isWeekend ? '' : undefined}
				data-overflow={isOverflow ? '' : undefined}
				data-selected={isSelected ? '' : undefined}
				data-disabled={isDisabled ? '' : undefined}
				data-highlighted={isHighlighted ? '' : undefined}
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
