import { useState, type SetStateAction, useRef } from 'react'
import { useStateControllable } from '../core'

export type UsePinFieldOptions = {
	defaultValue?: string
	disabled?: boolean
	length?: number
	secret?: boolean | string
	type?: 'alphabetic' | 'alphanumeric' | 'numeric'
	value?: string
	onChange?: (value: string) => void
}

export const usePinField = ({
	defaultValue,
	disabled = false,
	length = 4,
	secret,
	type = 'alphanumeric',
	value,
	onChange
}: UsePinFieldOptions = {}) => {
	const inputRef = useRef<HTMLInputElement>()

	const [inputId, setInputId] = useState<string>()

	const [focusWithin, setFocusWithin] = useState(false)

	const [pin = '', setPin] = useStateControllable({
		value,
		defaultValue,
		onChange: onChange as (value: SetStateAction<string>) => void
	})

	return {
		pin,
		length,
		secret,
		type,
		inputId,
		inputRef,
		disabled,
		focusWithin,
		setPin,
		setInputId,
		setFocusWithin
	}
}
