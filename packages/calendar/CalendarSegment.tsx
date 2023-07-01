import { useMemo, useCallback, type KeyboardEvent } from 'react'
import {
	freya,
	forwardRef,
	splitProps,
	type AsChildComponentProps
} from '../core'
import { useCalendarContext } from './CalendarContext'
import { CalendarDate } from './CalendarDate'

export type CalendarSegmentProps = AsChildComponentProps<
	'div',
	{
		step?: number
		mode?: 'numeric' | 'digit'
		label?: string
		segment: 'year' | 'month' | 'day'
		placeholder?: string
	}
>

export const CalendarSegment = forwardRef<'div', CalendarSegmentProps>(
	(props, forwardedRef) => {
		const [{ step = 1, mode, label, segment, placeholder }, otherProps] =
			splitProps(props, [
				'step',
				'mode',
				'label',
				'segment',
				'placeholder'
			])

		const { state, config } = useCalendarContext()

		const min = CalendarDate[`${segment}Min`]
		const max = CalendarDate[`${segment}Max`]
		const value = state.date.get(segment)

		const content = useMemo(() => {
			if (value === undefined) {
				return placeholder
			}

			if (mode === 'digit') {
				return String(value).padStart(String(max).length, '0')
			}

			return String(value)
		}, [max, mode, value, placeholder])

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLDivElement>) => {
				if (event.key === 'ArrowUp') {
					event.preventDefault()
					state.setDateSegment(
						segment,
						value !== undefined
							? value + step
							: config.today.get(segment)
					)
				}

				if (event.key === 'ArrowRight') {
					event.preventDefault()
					findSegment(event.currentTarget, 'next')?.focus()
				}

				if (event.key === 'ArrowDown') {
					event.preventDefault()
					state.setDateSegment(
						segment,
						value !== undefined
							? value - step
							: config.today.get(segment)
					)
				}

				if (event.key === 'ArrowLeft') {
					event.preventDefault()
					findSegment(event.currentTarget, 'previous')?.focus()
				}

				if (event.key === 'Backspace' || event.key === 'Delete') {
					event.preventDefault()
					state.setDateSegment(segment, undefined)
				}

				if (/[0-9]/.test(event.key)) {
					event.preventDefault()
					const valueAsString = String(value ?? '')
					const valueMutation = Number(valueAsString + event.key)

					if (valueMutation <= max) {
						state.setDateSegment(segment, valueMutation)
					} else {
						state.setDateSegment(segment, Number(event.key))
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
				tabIndex={0}
				suppressContentEditableWarning={true}
				style={{ caretColor: 'transparent' }}
				aria-label={label}
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={value}
				onKeyDown={handleKeyDown}
				//'aria-invalid': invalid ? true : undefined,
				{...otherProps}
			>
				{content}
			</freya.div>
		)
	}
)

const findSegment = (element: Element, direction: 'next' | 'previous') => {
	let sibling = element[`${direction}ElementSibling`]

	while (sibling) {
		if (sibling.matches('[role="spinbutton"]')) {
			return sibling as HTMLElement
		}

		sibling = sibling[`${direction}ElementSibling`]
	}
}
