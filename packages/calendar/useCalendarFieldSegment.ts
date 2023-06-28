import { useMemo, useEffect, useCallback, type KeyboardEvent } from 'react'

export type UseCalendarFieldSegmentOptions = {
	min?: number
	max: number
	step?: number
	start?: number
	style?: 'numeric' | '2-digit'
	value?: number
	label: string
	invalid: boolean
	placeholder: string
	onChange: (value: number | undefined) => void
}

export const useCalendarFieldSegment = ({
	min = 1,
	max,
	step = 1,
	start = min,
	style = 'numeric',
	value,
	label,
	invalid,
	placeholder,
	onChange
}: UseCalendarFieldSegmentOptions) => {
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
				onChange(
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

	return useMemo(
		() => ({
			role: 'spinbutton',
			'aria-valuemin': min,
			'aria-valuemax': max,
			'aria-valuenow': value,
			'aria-label': label,
			'aria-invalid': invalid ? true : undefined,
			inputMode: 'numeric',
			autoCorrect: 'off',
			autoCapitalize: 'off',
			contentEditable: true,
			tabIndex: 0,
			style: { caretColor: 'transparent' },
			children: value !== undefined ? display : placeholder,
			suppressContentEditableWarning: true,
			onKeyDown: handleKeyDown
		}),
		[min, max, value, label, invalid, display, placeholder, handleKeyDown]
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
