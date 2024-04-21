import { useState, useEffect } from 'react'
import type { PinDirection } from './PinTypes'

export type UsePinConcealOptions = {
	delay: number
	direction: PinDirection
	enabled?: boolean
	placeholder?: string
	symbol: string
	value?: string
}

export const usePinConceal = ({
	delay,
	direction,
	enabled = true,
	placeholder = '',
	symbol,
	value
}: UsePinConcealOptions) => {
	const [display, setDisplay] = useState<string>()

	// @ts-expect-error ts(7030): Not all code paths return a value.
	useEffect(() => {
		if (!enabled) {
			setDisplay(value ?? placeholder)
		} else if (!value) {
			setDisplay(placeholder)
		} else if (direction === 'backwards') {
			setDisplay(symbol)
		} else {
			const timeout = setTimeout(() => setDisplay(symbol), delay)

			setDisplay(value)

			return () => {
				clearTimeout(timeout)
			}
		}
	}, [enabled, delay, direction, value, symbol, placeholder])

	return display
}
