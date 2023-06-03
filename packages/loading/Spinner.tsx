import type { CSSProperties } from 'react'

export type SpinnerProps = {
	arc?: number
	cap?: 'butt' | 'round' | 'square'
	radius?: number
	duration?: number
	thickness?: number
	style?: CSSProperties
	className?: string
	[key: `data-${string}`]: string
}

export const Spinner = ({
	arc: arcProp = 75,
	cap = 'round',
	radius: radiusProp = 18,
	duration = 2,
	thickness = 4,
	...otherProps
}: SpinnerProps) => {
	const radius = radiusProp - thickness / 2
	const diameter = radius * 2 + thickness
	const center = diameter / 2
	const circumference = radius * Math.PI * 2
	const arc = (circumference * arcProp) / 100

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox={`0 0 ${diameter} ${diameter}`}
			width={diameter}
			height={diameter}
			fill='currentColor'
			{...otherProps}
		>
			<circle
				r={radius}
				fill='none'
				stroke='currentColor'
				strokeWidth={thickness}
				strokeLinecap={cap}
				strokeDasharray={`${arc},${circumference}`}
				cx={center}
				cy={center}
			>
				<animateTransform
					attributeName='transform'
					type='rotate'
					from={`0 ${center} ${center}`}
					to={`360 ${center} ${center}`}
					dur={`${duration}s`}
					repeatCount='indefinite'
				/>
			</circle>
		</svg>
	)
}
