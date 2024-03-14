import { useMemo } from 'react'

export type UseSpinnerOptions = {
	arc?: number
	cap?: 'butt' | 'round' | 'square'
	angle?: number
	radius?: number
	duration?: number
	thickness?: number
}

export const useSpinner = ({
	arc: arcProp = 75,
	cap = 'round',
	angle = 0,
	radius: radiusProp = 18,
	duration = 1,
	thickness = 4
}: UseSpinnerOptions = {}) =>
	useMemo(() => {
		const rotate = -90 + angle
		const radius = radiusProp - thickness / 2
		const diameter = radius * 2 + thickness
		const center = diameter / 2
		const circumference = radius * Math.PI * 2
		const arc = (circumference * arcProp) / 100

		return {
			cap,
			duration,
			rotate,
			radius,
			thickness,
			diameter,
			center,
			circumference,
			arc
		}
	}, [arcProp, cap, duration, angle, radiusProp, thickness])
