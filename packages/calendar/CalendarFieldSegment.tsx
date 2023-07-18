import { useMemo, useCallback, type KeyboardEvent } from 'react'
import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { useCalendarFieldContext } from './CalendarFieldContext'
import { useCalendarLocalisation } from './useCalendarLocalisation'
import {
	CalendarDate,
	type CalendarDateMutation,
	type CalendarDateSegmentTypeEditable
} from './CalendarDate'

export type CalendarFieldSegmentProps = AsChildComponentProps<
	'div',
	{
		type: CalendarDateSegmentTypeEditable
		mode?: 'numeric' | 'digit'
		placeholder?: string
	}
>

export const CalendarFieldSegment = forwardRef<
	'div',
	CalendarFieldSegmentProps
>(
	(
		{ type, mode = 'digit', style, placeholder, ...otherProps },
		forwardedRef
	) => {
		const {
			locale,
			labelId,
			minDate,
			maxDate,
			selectedDate,
			setSelectedDate,
			focusedSegment,
			setFocusedSegment
		} = useCalendarFieldContext()

		const isAfter = Boolean(
			maxDate && selectedDate && selectedDate.isAfter(maxDate)
		)
		const isBefore = Boolean(
			minDate && selectedDate && selectedDate.isBefore(minDate)
		)
		const isInvalid = isAfter || isBefore
		const isHighlighted = focusedSegment === type

		const localisation = useCalendarLocalisation(locale)
		const value = selectedDate?.get(type)
		const text = selectedDate?.format(locale, {
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

		const changeSegment = useCallback(
			(
				event: KeyboardEvent<HTMLDivElement>,
				action: 'set' | 'add' | 'sub' | 'clear',
				mutation: CalendarDateMutation = {}
			) => {
				event.preventDefault()
				setSelectedDate((prev) => {
					if (action === 'clear') {
						return null
					}

					if (!prev) {
						return new CalendarDate()
					}

					const next = prev[action](mutation)
					const limit = action === 'add' ? minDate : maxDate
					const check = action === 'add' ? 'isAfter' : 'isBefore'

					return limit && next[check](limit) ? limit : next
				})
			},
			[minDate, maxDate, setSelectedDate]
		)

		const changeFocusedSegment = useCallback(
			(
				event: KeyboardEvent<HTMLDivElement>,
				action: 'next' | 'previous'
			) => {
				event.preventDefault()
				const element = findSegment(event.currentTarget, action)

				if (element !== undefined) {
					element.focus()
					setFocusedSegment(
						element.dataset
							.segment as CalendarDateSegmentTypeEditable
					)
				}
			},
			[setFocusedSegment]
		)

		const handleClick = useCallback(() => {
			setFocusedSegment(type)
		}, [type, setFocusedSegment])

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLDivElement>) => {
				if (event.code !== 'Tab') {
					event.preventDefault()
				}

				if (event.code === 'ArrowUp') {
					changeSegment(event, 'add', { [type]: 1 })
				}

				if (event.code === 'ArrowRight') {
					changeFocusedSegment(event, 'next')
				}

				if (event.code === 'ArrowDown') {
					changeSegment(event, 'sub', { [type]: 1 })
				}

				if (event.code === 'ArrowLeft') {
					changeFocusedSegment(event, 'previous')
				}

				if (event.code === 'Backspace' || event.key === 'Delete') {
					changeSegment(event, 'clear')
				}

				if (/[0-9]/.test(event.key)) {
					const valueString = String(value ?? '')
					const valueIntent = Number(valueString + event.key)

					changeSegment(event, 'set', { [type]: valueIntent })

					// if (String(valueMutation).length === String(max).length) {
					// 	changeFocusedSegment(event, 'next')
					// }
				}
			},
			[type, value, changeSegment, changeFocusedSegment]
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
				data-segment={type}
				data-placeholder={!value ? '' : undefined}
				aria-label={localisation.of(type)}
				aria-labelledby={labelId}
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
