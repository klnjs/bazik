import { useMemo, useCallback, type KeyboardEvent } from 'react'
import {
	freya,
	forwardRef,
	splitProps,
	type AsChildComponentProps
} from '../core'
import { useCalendarContext } from './CalendarContext'
import type { CalendarDateSegment } from './CalendarDate'

export type CalendarFieldSegmentProps = AsChildComponentProps<
	'div',
	{
		step?: number
		style?: 'numeric' | '2-digit'
		segment: 'year' | 'month' | 'day'
	}
>

export const CalendarFieldSegment = forwardRef<
	'div',
	CalendarFieldSegmentProps
>((props, forwardedRef) => {
	const [{ step = 1, segment, style }, otherProps] = splitProps(props, [
		'step',
		'style',
		'segment'
	])

	const { state, config } = useCalendarContext()
	const { min, max, label, placeholder } = useSegment(segment)

	const value = state.date.getSegment(segment)
	const content = useMemo(() => {
		if (value === undefined) {
			return placeholder
		}

		return String(value).padStart(style === '2-digit' ? 2 : 0, '0')
	}, [value, style, placeholder])

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			if (event.key !== 'Tab') {
				event.preventDefault()
			}

			if (event.key === 'ArrowUp') {
				state.setDateSegment(
					segment,
					value !== undefined
						? Math.min(value + step, max)
						: config.today.getSegment(segment)
				)
			}

			if (event.key === 'ArrowRight') {
				findSegment(event.currentTarget, 'next')?.focus()
			}

			if (event.key === 'ArrowDown') {
				state.setDateSegment(
					segment,
					value !== undefined
						? Math.max(value - step, min)
						: config.today.getSegment(segment)
				)
			}

			if (event.key === 'ArrowLeft') {
				findSegment(event.currentTarget, 'previous')?.focus()
			}

			if (event.key === 'Backspace' || event.key === 'Delete') {
				state.setDateSegment(segment, undefined)
			}

			if (/[0-9]/.test(event.key)) {
				const valueAsString = String(value ?? '')
				const valueMutation = Number(valueAsString + event.key)

				if (valueMutation <= max) {
					state.setDateSegment(segment, valueMutation)
				} else {
					state.setDateSegment(segment, Number(event.key))
				}
			}
		},
		[min, max, step, value, state, config, segment]
	)

	return (
		<freya.div
			ref={forwardedRef}
			inputMode='numeric'
			autoCorrect='off'
			autoCapitalize='off'
			contentEditable={true}
			tabIndex={0}
			suppressContentEditableWarning={true}
			style={{ caretColor: 'transparent' }}
			aria-valuemin={min}
			aria-valuemax={max}
			aria-valuenow={value}
			aria-label={label}
			onKeyDown={handleKeyDown}
			//'aria-invalid': invalid ? true : undefined,
			{...otherProps}
		>
			{content}
		</freya.div>
	)
})

const findSegment = (element: Element, direction: 'next' | 'previous') => {
	let sibling = element[`${direction}ElementSibling`]

	while (sibling) {
		if (sibling.matches('[role="spinbutton"]')) {
			return sibling as HTMLElement
		}

		sibling = sibling[`${direction}ElementSibling`]
	}
}

const useSegment = (segment: CalendarDateSegment) =>
	useMemo(() => {
		switch (segment) {
			case 'year':
				return { min: 1, max: 9999, label: 'Year', placeholder: 'yyyy' }
			case 'month':
				return { min: 1, max: 12, label: 'Month', placeholder: 'mm' }
			case 'day':
				return { min: 1, max: 31, label: 'Day', placeholder: 'dd' }
			default:
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				throw new Error(`Invalid segment: ${segment}`)
		}
	}, [segment])
