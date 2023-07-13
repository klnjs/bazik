import { useMemo, useCallback, type KeyboardEvent } from 'react'
import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { useCalendarContext } from './CalendarContext'
import { CalendarDate, type CalendarFocusedSegment } from './CalendarDate'

export type CalendarSegmentProps = AsChildComponentProps<
	'div',
	{
		step?: number
		mode?: 'numeric' | 'digit'
		segment: CalendarFocusedSegment
		placeholder?: string
	}
>

export const CalendarSegment = forwardRef<'div', CalendarSegmentProps>(
	(
		{
			step = 1,
			mode = 'digit',
			style,
			segment,
			placeholder,
			...otherProps
		},
		forwardedRef
	) => {
		const { state, config } = useCalendarContext()

		const localisation = useMemo(
			() =>
				new Intl.DisplayNames(config.locale, { type: 'dateTimeField' }),
			[config.locale]
		)

		const min = CalendarDate[`${segment}Min`]
		const max = CalendarDate[`${segment}Max`]
		const value = state.date.get(segment)
		const content = useMemo(() => {
			if (value === undefined) {
				return placeholder ?? ''.padStart(String(max).length, '-')
			}

			if (mode === 'digit') {
				return String(value).padStart(String(max).length, '0')
			}

			return String(value)
		}, [max, mode, value, placeholder])

		const isHighlighted = state.focusedSegment === segment
		const isInvalid =
			state.date.isValid() &&
			(state.date.isBefore(config.min) || state.date.isAfter(config.max))

		const handleClick = useCallback(() => {
			state.setFocusedSegment(segment)
		}, [state, segment])

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLDivElement>) => {
				if (event.code !== 'Tab') {
					event.preventDefault()
				}

				if (event.code === 'ArrowUp') {
					state.setDate((prev) =>
						prev.clone({
							[segment]:
								value !== undefined
									? value + step
									: config.today.get(segment)
						})
					)
				}

				if (event.code === 'ArrowRight') {
					const element = findSegment(event.currentTarget, 'next')

					if (element !== undefined) {
						element.focus()
						state.setFocusedSegment(
							element.dataset.segment as CalendarFocusedSegment
						)
					}
				}

				if (event.code === 'ArrowDown') {
					state.setDate((prev) =>
						prev.clone({
							[segment]:
								value !== undefined
									? value - step
									: config.today.get(segment)
						})
					)
				}

				if (event.code === 'ArrowLeft') {
					const element = findSegment(event.currentTarget, 'previous')

					if (element !== undefined) {
						element.focus()
						state.setFocusedSegment(
							element.dataset.segment as CalendarFocusedSegment
						)
					}
				}

				if (event.code === 'Backspace' || event.key === 'Delete') {
					state.setDate((prev) =>
						prev.clone({
							[segment]: undefined
						})
					)
				}

				if (/[0-9]/.test(event.key)) {
					const valueString = String(value ?? '')
					const valueIntent = Number(valueString + event.key)
					const valueMutation =
						valueIntent <= max ? valueIntent : Number(event.key)

					state.setDate((prev) =>
						prev.clone({
							[segment]: valueMutation
						})
					)

					if (String(valueMutation).length === String(max).length) {
						const element = findSegment(event.currentTarget, 'next')

						if (element !== undefined) {
							element.focus()
							state.setFocusedSegment(
								element.dataset
									.segment as CalendarFocusedSegment
							)
						}
					}
				}
			},
			[max, step, value, state, config, segment]
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
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={value}
				aria-valuetext={value ? String(value) : 'Empty'}
				aria-invalid={isInvalid}
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
