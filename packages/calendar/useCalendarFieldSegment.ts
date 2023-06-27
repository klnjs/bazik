import { useMemo, useEffect, useCallback, type KeyboardEvent } from 'react'
import { useControlledState } from '../core/useControlledState'

export type UseCalendarFieldSegmentOptions = {
	min: number
	max: number
	step?: number
	style?: 'numeric' | '2-digit'
	value?: number
	label: string
	placeholder: string
	defaultValue?: number
}

export const useCalendarFieldSegment = ({
	min,
	max,
	step = 1,
	style = 'numeric',
	value: valueProp,
	label,
	placeholder,
	defaultValue
}: UseCalendarFieldSegmentOptions) => {
	const [value, setValue] = useControlledState(defaultValue, valueProp)

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
				setValue((prev) =>
					prev !== undefined ? Math.min(prev + step, max) : min
				)
			}

			if (event.key === 'ArrowRight') {
				findSegment(event.currentTarget, 'next')?.focus()
			}

			if (event.key === 'ArrowDown') {
				setValue((prev) =>
					prev !== undefined ? Math.max(prev - step, min) : max
				)
			}

			if (event.key === 'ArrowLeft') {
				findSegment(event.currentTarget, 'previous')?.focus()
			}

			if (event.key === 'Backspace' || event.key === 'Delete') {
				setValue(undefined)
			}

			if (/[0-9]/.test(event.key)) {
				const valueAsString = String(value ?? '')
				const valueMutation = Number(valueAsString + event.key)

				if (valueMutation <= max) {
					setValue(valueMutation)
				} else {
					setValue(Number(event.key))
				}
			}
		},
		[min, max, step, value, setValue]
	)

	useEffect(() => {
		if (value !== undefined && value > max) {
			setValue(max)
		}
	}, [value, max, setValue])

	return useMemo(
		() => ({
			role: 'spinbutton',
			'aria-valuemin': min,
			'aria-valuemax': max,
			'aria-valuenow': value,
			'aria-label': label,
			inputMode: 'numeric',
			contentEditable: true,
			tabIndex: 0,
			style: { caretColor: 'transparent' },
			children: value !== undefined ? display : placeholder,
			suppressContentEditableWarning: true,
			onKeyDown: handleKeyDown
		}),
		[min, max, value, display, label, placeholder, handleKeyDown]
	)
}

const findSegment = (element: Element, direction: 'next' | 'previous') => {
	let sibling = element[`${direction}ElementSibling`]

	while (sibling) {
		if (sibling.matches('[role="spinbutton"]')) {
			return sibling as HTMLElement
		}

		sibling = sibling[`${direction}ElementSibling`]
	}
}
