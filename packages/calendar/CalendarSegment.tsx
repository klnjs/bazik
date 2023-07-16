import { useMemo, useCallback, type KeyboardEvent } from 'react'
import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { useCalendarContext } from './CalendarContext'
import { useCalendarLocalisation } from './useCalendarLocalisation'
import type { CalendarDateSegment, CalendarDateMutation } from './CalendarDate'

export type CalendarSegmentProps = AsChildComponentProps<
	'div',
	{
		mode?: 'numeric' | 'digit'
		segment: CalendarDateSegment
		placeholder?: string
	}
>

export const CalendarSegment = forwardRef<'div', CalendarSegmentProps>(
	(
		{ mode = 'digit', style, segment, placeholder, ...otherProps },
		forwardedRef
	) => {
		const {
			state,
			config: { min, max, today, locale }
		} = useCalendarContext()

		const isAfter = Boolean(state.date && max && state.date.isAfter(max))
		const isBefore = Boolean(state.date && min && state.date.isBefore(min))
		const isInvalid = isAfter || isBefore
		const isHighlighted = state.focusedSegment === segment

		const localisation = useCalendarLocalisation()
		const value = state.date?.getSegment(segment)
		const text = state.date?.format(locale, {
			year: 'numeric',
			month: 'long',
			weekday: 'long',
			day: 'numeric'
		})

		const content = useMemo(() => {
			if (value === undefined) {
				return placeholder ?? ''.padStart(2, '-')
			}

			if (mode === 'digit') {
				return String(value).padStart(2, '0')
			}

			return String(value)
		}, [mode, value, placeholder])

		const changeDate = useCallback(
			(
				event: KeyboardEvent<HTMLDivElement>,
				action: 'add' | 'sub',
				mutation: CalendarDateMutation
			) => {
				event.preventDefault()
				state.setDate((prev) => {
					if (!prev) {
						return today
					}

					const next = prev[action](mutation)
					const limit = action === 'add' ? max : min
					const check = action === 'add' ? 'isAfter' : 'isBefore'

					return limit && next[check](limit) ? limit : next
				})
			},
			[state, min, max, today]
		)

		const handleClick = useCallback(() => {
			state.setFocusedSegment(segment)
		}, [state, segment])

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLDivElement>) => {
				if (event.code !== 'Tab') {
					event.preventDefault()
				}

				if (event.code === 'ArrowUp') {
					changeDate(event, 'add', { [segment]: 1 })
				}

				if (event.code === 'ArrowRight') {
					const element = findSegment(event.currentTarget, 'next')

					if (element !== undefined) {
						element.focus()
						state.setFocusedSegment(
							element.dataset.segment as CalendarDateSegment
						)
					}
				}

				if (event.code === 'ArrowDown') {
					changeDate(event, 'sub', { [segment]: 1 })
				}

				if (event.code === 'ArrowLeft') {
					const element = findSegment(event.currentTarget, 'previous')

					if (element !== undefined) {
						element.focus()
						state.setFocusedSegment(
							element.dataset.segment as CalendarDateSegment
						)
					}
				}

				if (event.code === 'Backspace' || event.key === 'Delete') {
					state.setDate(null)
				}

				// if (/[0-9]/.test(event.key)) {
				// 	const valueString = String(value ?? '')
				// 	const valueIntent = Number(valueString + event.key)
				// 	const valueMutation =
				// 		valueIntent <= max ? valueIntent : Number(event.key)

				// 	state.setDate((prev) =>
				// 		prev.clone({
				// 			[segment]: valueMutation
				// 		})
				// 	)

				// 	if (String(valueMutation).length === String(max).length) {
				// 		const element = findSegment(event.currentTarget, 'next')

				// 		if (element !== undefined) {
				// 			element.focus()
				// 			state.setFocusedSegment(
				// 				element.dataset.segment as CalendarDateSegment
				// 			)
				// 		}
				// 	}
				// }
			},
			[state, segment, changeDate]
		)

		return (
			<freya.div
				ref={forwardedRef}
				role='spinbutton'
				inputMode='numeric'
				autoCorrect='off'
				autoCapitalize='off'
				spellCheck={false}
				contentEditable={true}
				tabIndex={isHighlighted ? 0 : -1}
				suppressContentEditableWarning={true}
				style={{ ...style, caretColor: 'transparent' }}
				data-segment={segment}
				data-placeholder={!value ? '' : undefined}
				aria-label={localisation.of(segment)}
				// aria-valuemin={min}
				// aria-valuemax={max}
				aria-valuenow={value}
				aria-valuetext={text ?? 'Empty'}
				aria-invalid={isInvalid}
				aria-description={text}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				{...otherProps}
			>
				{content}
			</freya.div>
		)
	}
)

const findSegment = (element: Element, direction: 'next' | 'previous') => {
	// @ts-expect-error element not allowed to be null
	// eslint-disable-next-line no-cond-assign, no-param-reassign
	while ((element = element[`${direction}ElementSibling`]) !== null) {
		if (element.matches('[data-segment]')) {
			return element as HTMLElement
		}
	}
}
