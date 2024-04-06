import { freya, forwardRef, type CoreProps } from '@klnjs/core'
import { useSpinnerContext } from './SpinnerContext'

export type SpinnerThumbProps = CoreProps<
	'circle',
	{
		arc?: number
		angle?: number
		cap?: 'butt' | 'round' | 'square'
	}
>

export const SpinnerThumb = forwardRef<'circle', SpinnerThumbProps>(
	(
		{ arc: arcProp = 0, angle = 0, cap = 'round', ...otherProps },
		forwardedRef
	) => {
		const { width, radius, center, duration, circumference } =
			useSpinnerContext()

		const arc = (circumference * arcProp) / 100
		const rotate = -90 + angle

		return (
			<freya.circle
				ref={forwardedRef}
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
					type="rotate"
					values={`${rotate} ${center} ${center};${rotate + 360} ${center} ${center}`}
					repeatCount="indefinite"
				/>
			</freya.circle>
		)
	}
)
