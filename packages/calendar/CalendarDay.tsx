import {
	useRef,
	useEffect,
	useCallback,
	useImperativeHandle,
	type KeyboardEvent,
	type MouseEvent
} from 'react'
import {
	freya,
	forwardRef,
	splitProps,
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
	(props, forwardedRef) => {
		const { state, config } = useCalendarContext()
		const [
			{ date, disabled, disabledOnWeekend, disabledOnOverflow },
			otherProps
		] = splitProps(props, [
			'date',
			'disabled',
			'disabledOnWeekend',
			'disabledOnOverflow'
		])
		const ref = useRef<HTMLDivElement>(null)

		const isToday = date.isToday()
		const isAfter = date.isAfter(config.max)
		const isBefore = date.isBefore(config.min)
		const isWeekend = date.isWeekend(config.locale)
		const isSelected = date.isEquals(state.date)
		const isOverflow = !date.isEquals(state.dateVisible, ['year', 'month'])
		const isHighlighted = date.isEquals(state.dateVisible)
		const isDisabled =
			disabled ||
			(disabledOnWeekend && isWeekend) ||
			(disabledOnOverflow && isOverflow) ||
			isAfter ||
			isBefore

		const changeDate = useCallback(
			(
				event:
					| KeyboardEvent<HTMLDivElement>
					| MouseEvent<HTMLDivElement>
			) => {
				if (!isDisabled) {
					event.preventDefault()
					state.setDate(date)
					state.setDateVisible(date)
				}
			},
			[date, state, isDisabled]
		)

		const changeDateVisible = useCallback(
			(
				event: KeyboardEvent<HTMLDivElement>,
				action: 'add' | 'sub',
				clone: boolean,
				options: CalendarDateProps
			) => {
				event.preventDefault()
				state.setDateVisible((prev) => {
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
				if (event.key === 'Enter' || event.key === 'space') {
					changeDate(event)
				}

				if (event.key === 'ArrowUp') {
					changeDateVisible(event, 'sub', false, { day: 7 })
				}

				if (event.key === 'ArrowRight') {
					changeDateVisible(event, 'add', false, { day: 1 })
				}

				if (event.key === 'ArrowDown') {
					changeDateVisible(event, 'add', false, { day: 7 })
				}

				if (event.key === 'ArrowLeft') {
					changeDateVisible(event, 'sub', false, { day: 1 })
				}

				if (event.key === 'Home') {
					changeDateVisible(event, 'sub', true, { day: 0 })
				}

				if (event.key === 'End') {
					changeDateVisible(event, 'add', true, {
						day: state.dateVisible.getDaysInMonth()
					})
				}

				if (event.key === 'PageUp') {
					changeDateVisible(event, 'sub', false, { month: 1 })
				}

				if (event.key === 'PageDown') {
					changeDateVisible(event, 'add', false, { month: 1 })
				}
			},
			[state, changeDate, changeDateVisible]
		)

		useEffect(() => {
			if (isHighlighted) {
				// @ts-expect-error focusVisible param is experimental
				// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
				ref.current?.focus({ focusVisible: true })
			}
		}, [isHighlighted])

		useImperativeHandle(
			forwardedRef,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			() => ref.current!
		)

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
				aria-label={date.format(config.locale, {
					year: 'numeric',
					month: 'long',
					weekday: 'long',
					day: 'numeric'
				})}
				aria-selected={isSelected}
				aria-disabled={isDisabled}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				{...otherProps}
			/>
		)
	}
)
