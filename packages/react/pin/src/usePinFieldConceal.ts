import { useState, useEffect } from 'react'

export type UsePinFieldConcealOptions = {
	delay: number
	value?: string
	symbol: string | null
	direction?: 'forwards' | 'backwards'
	placeholder?: string
}

export const usePinFieldConceal = ({
	delay = 0,
	direction = 'forwards',
	value,
	symbol,
	placeholder = ''
}: UsePinFieldConcealOptions) => {
	const [display, setDisplay] = useState<string>()

	// @ts-expect-error ts(7030): Not all code paths return a value.
	useEffect(() => {
		if (!value) {
			setDisplay(placeholder)
		} else if (direction === 'backwards' || delay === 0) {
			setDisplay(symbol ?? value)
		} else {
			setDisplay(value)

			if (symbol) {
				const timeout = setTimeout(() => setDisplay(symbol), delay)

				return () => {
					clearTimeout(timeout)
				}
			}
		}
	}, [delay, direction, value, symbol, placeholder])

	return display
}
