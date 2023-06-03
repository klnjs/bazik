import {
	useRef,
	useMemo,
	useLayoutEffect,
	useImperativeHandle,
	forwardRef,
	type ChangeEvent,
	type KeyboardEvent
} from 'react'
import { Textfield, type TextfieldProps } from './Textfield'
import { TextfieldSelection } from './TextfieldSelection'

export type TextfieldWithMaskProps = TextfieldProps & {
	mask: string
}

export const TextfieldWithMask = forwardRef<
	HTMLInputElement,
	TextfieldWithMaskProps
>(function TextfieldWithMask(
	{
		mask: maskProp,
		value: valueProp,
		placeholder: placeholderProp,
		onChange,
		...otherProps
	},
	forwardedRef
) {
	const textfieldRef = useRef<HTMLInputElement>(null)
	const textfieldSelectionRef = useRef<TextfieldSelection>()

	const value = useMask(valueProp, maskProp)
	const placeholder = useMask(placeholderProp, maskProp)

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		const textfield = event.target as HTMLInputElement
		const textfieldKey = event.key
		const textfieldSelection = TextfieldSelection.fromInput(textfield)
		const textfieldValue = textfield.value
		const textfieldValueNext = mask(textfieldValue + textfieldKey, maskProp)

		if (textfieldSelection) {
			if (textfieldKey === 'Backspace') {
				textfieldSelectionRef.current = textfieldSelection
					.moveTo({
						start: lastIndexOf(
							/[0-9]/,
							textfieldValue,
							textfieldSelection.start - 1
						)
					})
					.applyTo(textfield)
					.collapseToStart()
			} else if (textfieldKey === 'Delete') {
				textfieldSelectionRef.current =
					textfieldSelection.collapseToStart()
			} else if (textfieldKey.match(/[0-9]/)) {
				if (textfieldValue.length === textfieldSelection.end) {
					textfieldSelectionRef.current = textfieldSelection.moveTo(
						textfieldValueNext.length
					)
				} else {
					textfieldSelectionRef.current = textfieldSelection.moveBy(1)
				}
			} else {
				textfieldSelectionRef.current = undefined
			}
		}
	}

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			event.target.value = unmask(event.target.value)
			onChange(event)
		}
	}

	// Expose the internal textfield ref to the implementing component
	// by imperatively using the forwardedRef.
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	useImperativeHandle(forwardedRef, () => textfieldRef.current!)

	// This effect is used to restore the selection range after modification
	// we useLayoutEffect to make sure this happens synchronously so there
	// is no visual delay for the user.
	useLayoutEffect(() => {
		const textfield = textfieldRef.current
		const textfieldSelection = textfieldSelectionRef.current

		if (textfield && textfieldSelection) {
			textfieldSelection.applyTo(textfield)
		}
	})

	return (
		<Textfield
			ref={textfieldRef}
			value={value}
			maxLength={maskProp.length}
			placeholder={placeholder}
			onChange={handleChange}
			onKeyDown={handleKeyDown}
			{...otherProps}
		/>
	)
})

const unmask = (value: string) => value.replace(/[^0-9]/g, '')

const mask = (value: string, pattern: string) => {
	const bucket = Array.from(value)
	let result = ''

	for (let index = 0; index < pattern.length; index++) {
		if (pattern.charAt(index) !== '#') {
			result += pattern.charAt(index)
		} else if (bucket.length === 0) {
			break
		} else {
			result += bucket.splice(0, 1)[0]
		}
	}

	return result
}

const useMask = (value: string | undefined, pattern: string) =>
	useMemo(
		() => (value !== undefined ? mask(value, pattern) : undefined),
		[value, pattern]
	)

const lastIndexOf = (
	regex: RegExp,
	value: string,
	start: number = value.length
) => {
	for (let index = start; index > -1; index--) {
		if (value.charAt(index).match(regex)) {
			return index
		}
	}

	return 0
}
