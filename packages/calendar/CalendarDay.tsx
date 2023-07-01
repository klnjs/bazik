import {
	useRef,
	useEffect,
	useCallback,
	useImperativeHandle,
	type KeyboardEvent
} from 'react'
import {
	freya,
	forwardRef,
	splitProps,
	type AsChildComponentProps
} from '../core'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDate } from './CalendarDate'

export type CalendarDayProps = AsChildComponentProps<
	'button',
	{ date: CalendarDate }
>

export const CalendarDay = forwardRef<'button', CalendarDayProps>(
	(props, forwardedRef) => {
		const { state, config } = useCalendarContext()
		const [{ date }, componentProps] = splitProps(props, ['date'])
		const ref = useRef<HTMLButtonElement>(null)

		const isAfterMax = date.isAfter(config.max)
		const isBeforeMin = date.isBefore(config.min)
		const isThisMonth = date.isEquals(state.dateVisible, ['year', 'month'])

		const today = date.isToday()
		const enabled = isThisMonth && !isAfterMax && !isBeforeMin
		const selected = date.isEquals(state.date)
		const highlighted = date.isEquals(state.dateVisible)

		const handleClick = useCallback(() => {
			state.setDate(date)
			state.setDateVisible(date)
		}, [state, date])

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLButtonElement>) => {
				if (event.key === 'ArrowUp') {
					event.preventDefault()
					state.setDateVisible((prev) => prev.sub({ day: 7 }))
				}

				if (event.key === 'ArrowRight') {
					event.preventDefault()
					state.setDateVisible((prev) => prev.add({ day: 1 }))
				}

				if (event.key === 'ArrowDown') {
					event.preventDefault()
					state.setDateVisible((prev) => prev.add({ day: 7 }))
				}

				if (event.key === 'ArrowLeft') {
					event.preventDefault()
					state.setDateVisible((prev) => prev.sub({ day: 1 }))
				}

				if (event.key === 'Home') {
					event.preventDefault()
					state.setDateVisible((prev) => prev.getFirstDateOfMonth())
				}

				if (event.key === 'End') {
					event.preventDefault()
					state.setDateVisible((prev) => prev.getLastDateOfMonth())
				}

				if (event.key === 'PageUp') {
					event.preventDefault()
					state.setDateVisible((prev) => prev.sub({ month: 1 }))
				}

				if (event.key === 'PageDown') {
					event.preventDefault()
					state.setDateVisible((prev) => prev.add({ month: 1 }))
				}
			},
			[state]
		)

		useEffect(() => {
			if (highlighted) {
				// @ts-expect-error focusVisible param is experimental
				// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
				ref.current?.focus({ focusVisible: true })
			}
		}, [highlighted])

		useImperativeHandle(
			forwardedRef,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			() => ref.current!
		)

		return (
			<freya.button
				ref={ref}
				type='button'
				disabled={!enabled}
				tabIndex={highlighted ? 0 : -1}
				data-today={today ? '' : undefined}
				data-selected={selected ? '' : undefined}
				data-highlighted={highlighted ? '' : undefined}
				aria-label={date.format(config.locale, {
					year: 'numeric',
					month: 'long',
					weekday: 'long',
					day: 'numeric'
				})}
				aria-selected={selected}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				{...componentProps}
			/>
		)
	}
)
