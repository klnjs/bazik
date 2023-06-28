import { useCallback } from 'react'
import { freya, forwardRef, type AsChildComponentProps } from '../core'
import { splitProps } from '../core/splitProps'
import { useCalendarFieldContext } from './CalendarFieldContext'
import type { CalendarFieldSegmentType } from './CalendarFieldTypes'

export type CalendarFieldSegmentProps = AsChildComponentProps<
	'div',
	{
		step?: number
		style?: 'numeric' | '2-digit'
		segment: 'year' | 'month' | 'day'
		label: string
		placeholder: string
	}
>

export const CalendarFieldSegment = forwardRef<
	'div',
	CalendarFieldSegmentProps
>((props, forwardedRef) => {
	const { state } = useCalendarFieldContext()
	const [{ step, segment, style }, otherProps] = splitProps(props, [
		'step',
		'style',
		'segment',
		'label',
		'placeholder'
	])

	const value = state.date[segment]
	const display =
		value !== undefined && style === '2-digit'
			? `0${value}`.slice(-2)
			: value

	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key !== 'Tab') {
				event.preventDefault()
			}

			if (event.key === 'ArrowUp') {
				state.setSegment(
					segment,
					value !== undefined ? Math.min(value + step, max) : start
				)
			}

			if (event.key === 'ArrowRight') {
				findSegment(event.currentTarget, 'next')?.focus()
			}

			if (event.key === 'ArrowDown') {
				onChange(
					value !== undefined ? Math.max(value - step, min) : start
				)
			}

			if (event.key === 'ArrowLeft') {
				findSegment(event.currentTarget, 'previous')?.focus()
			}

			if (event.key === 'Backspace' || event.key === 'Delete') {
				onChange(undefined)
			}

			if (/[0-9]/.test(event.key)) {
				const valueAsString = String(value ?? '')
				const valueMutation = Number(valueAsString + event.key)

				if (valueMutation <= max) {
					onChange(valueMutation)
				} else {
					onChange(Number(event.key))
				}
			}
		},
		[min, max, step, value, start, onChange]
	)

	useEffect(() => {
		if (value !== undefined && value > max) {
			onChange(max)
		}
	}, [max, value, onChange])

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
			{...otherProps}
		>
			{display}
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

function capitalize<T extends string>(string: T) {
	const head = string.charAt(0).toUpperCase()
	const tail = string.slice(1)

	return (head + tail) as Capitalize<T>
}

// const useCalendarFieldSegment = ({
// 	min = 1,
// 	max,
// 	step = 1,
// 	start = min,
// 	style = 'numeric',
// 	value,
// 	label,
// 	invalid,
// 	placeholder,
// 	onChange
// }: UseCalendarFieldSegmentOptions) => {
// 	const display =
// 		value !== undefined && style === '2-digit'
// 			? `0${value}`.slice(-2)
// 			: value

// 	const handleKeyDown = useCallback(
// 		(event: KeyboardEvent) => {
// 			if (event.key !== 'Tab') {
// 				event.preventDefault()
// 			}

// 			if (event.key === 'ArrowUp') {
// 				onChange(
// 					value !== undefined ? Math.min(value + step, max) : start
// 				)
// 			}

// 			if (event.key === 'ArrowRight') {
// 				findSegment(event.currentTarget, 'next')?.focus()
// 			}

// 			if (event.key === 'ArrowDown') {
// 				onChange(
// 					value !== undefined ? Math.max(value - step, min) : start
// 				)
// 			}

// 			if (event.key === 'ArrowLeft') {
// 				findSegment(event.currentTarget, 'previous')?.focus()
// 			}

// 			if (event.key === 'Backspace' || event.key === 'Delete') {
// 				onChange(undefined)
// 			}

// 			if (/[0-9]/.test(event.key)) {
// 				const valueAsString = String(value ?? '')
// 				const valueMutation = Number(valueAsString + event.key)

// 				if (valueMutation <= max) {
// 					onChange(valueMutation)
// 				} else {
// 					onChange(Number(event.key))
// 				}
// 			}
// 		},
// 		[min, max, step, value, start, onChange]
// 	)

// 	useEffect(() => {
// 		if (value !== undefined && value > max) {
// 			onChange(max)
// 		}
// 	}, [max, value, onChange])

// 	return useMemo(
// 		() => ({
// 			role: 'spinbutton',
// 			'aria-valuemin': min,
// 			'aria-valuemax': max,
// 			'aria-valuenow': value,
// 			'aria-label': label,
// 			'aria-invalid': invalid ? true : undefined,
// 			inputMode: 'numeric',
// 			autoCorrect: 'off',
// 			autoCapitalize: 'off',
// 			contentEditable: true,
// 			tabIndex: 0,
// 			style: { caretColor: 'transparent' },
// 			children: value !== undefined ? display : placeholder,
// 			suppressContentEditableWarning: true,
// 			onKeyDown: handleKeyDown
// 		}),
// 		[min, max, value, label, invalid, display, placeholder, handleKeyDown]
// 	)
// }
