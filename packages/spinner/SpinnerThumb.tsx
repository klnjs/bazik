import { freya, forwardRef, type CoreProps } from '../core'
import { useSpinnerContext } from './SpinnerContext'

export type SpinnerThumbProps = CoreProps<'circle'>

export const SpinnerThumb = forwardRef<'circle', SpinnerThumbProps>(
	(props, forwardedRef) => {
		const {
			arc,
			cap,
			radius,
			rotate,
			center,
			duration,
			circumference,
			thickness
		} = useSpinnerContext()

		return (
			<freya.circle
				ref={forwardedRef}
				r={radius}
				cx={center}
				cy={center}
				transform={`rotate(${rotate} ${center} ${center})`}
				fill="none"
				stroke="currentColor"
				strokeWidth={thickness}
				strokeLinecap={cap}
				strokeDasharray={`${arc},${circumference}`}
				{...props}
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
