import { useState, useEffect } from 'react'
import { useFirstRender } from '../core'

export type UsePinFieldConcealOptions = {
	delay: number
	value?: string
	symbol: string | null
	placeholder?: string
}

export const usePinFieldConceal = ({
	delay = 0,
	value,
	symbol,
	placeholder = ''
}: UsePinFieldConcealOptions) => {
	const isFirstRender = useFirstRender()
	const [display, setDisplay] = useState<string>(() => {
		if (!value) {
			return placeholder
		}

		return symbol ?? value
	})

	useEffect(() => {
		if (!isFirstRender) {
			if (!value) {
				setDisplay(placeholder)
			} else {
				setDisplay(value)

				if (symbol) {
					const timeout = setTimeout(() => setDisplay(symbol), delay)

					return () => {
						clearTimeout(timeout)
					}
				}
			}
		}

		return undefined
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, symbol, placeholder, delay])

	return display
}
