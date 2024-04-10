import { useMemo } from 'react'

export type UseSpinnerOptions = {
	size?: number
	width?: number
}

export const useSpinner = ({ size = 24, width = 4 }: UseSpinnerOptions = {}) =>
	useMemo(() => {
		const radius = size / 2 - width / 2
		const diameter = radius * 2 + width
		const center = diameter / 2
		const circumference = radius * Math.PI * 2

		return {
			width,
			center,
			radius,
			diameter,
			circumference
		}
	}, [size, width])
