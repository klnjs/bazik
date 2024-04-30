import { poly, type PolyProps } from '@klnjs/core'
import { useSpinnerContext } from './SpinnerContext'

export type SpinnerThumbProps = PolyProps<
	'circle',
	{
		arc?: number
		angle?: number
		easing?: string
		duration?: number
		cap?: 'butt' | 'round' | 'square'
	}
>

export const SpinnerThumb = 
	(
		{
			arc: arcProp = 25,
			angle = 0,
			easing,
			duration = 1,
			cap = 'round',
			...otherProps
		}: SpinnerThumbProps
	) => {
		const { width, radius, center, circumference } = useSpinnerContext()

		const arc = (circumference * arcProp) / 100
		const rotate = -90 + angle

		return (
			<poly.circle
				r={radius}
				cx={center}
				cy={center}
				transform={`rotate(${rotate} ${center} ${center})`}
				fill="none"
				stroke="currentColor"
				strokeWidth={width}
				strokeLinecap={cap}
				strokeDasharray={`${arc},${circumference}`}
				{...otherProps}
			>
				<animateTransform
					attributeName="transform"
					dur={`${duration}s`}
					calcMode="spline"
					keySplines={easing}
					type="rotate"
					values={`${rotate} ${center} ${center};${rotate + 360} ${center} ${center}`}
					repeatCount="indefinite"
				/>
			</poly.circle>
		)
	}
