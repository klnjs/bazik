import {
	useRef,
	useMemo,
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
import type { CalendarDate, CalendarDateProps } from './CalendarDate'

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
		const { state, config } = useCalendarContext()

		const ref = useRef<HTMLDivElement>(null)
		const isToday = date.isToday()
		const isAfter = date.isAfter(config.max)
		const isBefore = date.isBefore(config.min)
		const isWeekend = date.isWeekend(config.locale)
		const isSelected = date.isEquals(state.date)
		const isOverflow = !date.isEquals(state.focusedDate, ['year', 'month'])
		const isHighlighted = date.isEquals(state.focusedDate)
		const isDisabled =
			disabled ||
			(disabledOnWeekend && isWeekend) ||
			(disabledOnOverflow && isOverflow) ||
			isAfter ||
			isBefore

		const localisation = useMemo(
			() =>
				new Intl.RelativeTimeFormat(config.locale, { numeric: 'auto' }),
			[config.locale]
		)

		const formatted = date.format(config.locale, {
			year: 'numeric',
			month: 'long',
			weekday: 'long',
			day: 'numeric'
		})

		// Uncertain how this works in different locales, due to
		// the concatenation of the two labels.
		const label = isToday
			? `${localisation.format(0, 'day')}, ${formatted}`
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
				clone: boolean,
				options: CalendarDateProps
			) => {
				event.preventDefault()
				state.setFocusedDate((prev) => {
					const next = prev[clone ? 'clone' : action](options)
					const limit = action === 'add' ? config.max : config.min
					const check = action === 'add' ? 'isAfter' : 'isBefore'

					return next[check](limit) ? limit : next
				})
			},
			[state, config]
		)

		const handleClick = changeDate

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLDivElement>) => {
				if (event.code === 'Enter' || event.code === 'Space') {
					changeDate(event)
				}

				if (event.code === 'ArrowUp') {
					changeFocusedDate(event, 'sub', false, { day: 7 })
				}

				if (event.code === 'ArrowRight') {
					changeFocusedDate(event, 'add', false, { day: 1 })
				}

				if (event.code === 'ArrowDown') {
					changeFocusedDate(event, 'add', false, { day: 7 })
				}

				if (event.key === 'ArrowLeft') {
					changeFocusedDate(event, 'sub', false, { day: 1 })
				}

				if (event.code === 'Home') {
					changeFocusedDate(event, 'sub', true, { day: 0 })
				}

				if (event.code === 'End') {
					changeFocusedDate(event, 'add', true, {
						day: state.focusedDate.getDaysInMonth()
					})
				}

				if (event.code === 'PageUp') {
					changeFocusedDate(event, 'sub', false, { month: 1 })
				}

				if (event.code === 'PageDown') {
					changeFocusedDate(event, 'add', false, { month: 1 })
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
