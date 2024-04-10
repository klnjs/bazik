import { useMemo } from 'react'
import type { PinType } from './PinTypes'

export const patterns = {
	alphabetic: /^[a-zA-Z]*$/,
	alphanumeric: /^[a-zA-Z0-9]*$/,
	numeric: /^[0-9]*$/
}

export const usePinPattern = (type: PinType) =>
	useMemo(() => patterns[type], [type])
