import { useState, type SetStateAction, useRef, useMemo } from 'react'
import { useStateControllable, isRecord } from '../core'
import type { PinFieldConceal } from './PinFieldTypes'

export type UsePinFieldOptions = {
	conceal?: PinFieldConceal
	defaultValue?: string
	disabled?: boolean
	length?: number
	type?: 'alphabetic' | 'alphanumeric' | 'numeric'
	value?: string
	onChange?: (value: string) => void
}

export const usePinField = ({
	conceal: concealProp = false,
	defaultValue,
	disabled = false,
	length = 4,
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

	const conceal = useMemo(
		() => ({
			delay: isRecord(concealProp) ? concealProp.delay ?? 0 : 0,
			symbol: isRecord(concealProp)
				? concealProp.symbol
				: concealProp
					? '·'
					: null
		}),
		[concealProp]
	)

	return {
		conceal,
		disabled,
		focusWithin,
		inputId,
		inputRef,
		length,
		pin,
		type,
		setPin,
		setInputId,
		setFocusWithin
	}
}
