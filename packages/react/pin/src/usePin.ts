import { useState, type SetStateAction, useRef, useMemo } from 'react'
import { useStateControllable } from '@klnjs/core'
import { isRecord } from '@klnjs/assertion'
import type { PinConceal } from './PinTypes'

export type UsePinOptions = {
	conceal?: PinConceal
	defaultValue?: string
	disabled?: boolean
	length?: number
	type?: 'alphabetic' | 'alphanumeric' | 'numeric'
	value?: string
	onChange?: (value: string) => void
}

export const usePin = ({
	conceal: concealProp = false,
	defaultValue,
	disabled = false,
	length = 4,
	type = 'alphanumeric',
	value,
	onChange
}: UsePinOptions = {}) => {
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
