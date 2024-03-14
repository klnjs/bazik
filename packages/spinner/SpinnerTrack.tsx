import { freya, forwardRef, type CoreProps } from '../core'
import { useSpinnerContext } from './SpinnerContext'

export type SpinnerTrackProps = CoreProps<'circle'>

export const SpinnerTrack = forwardRef<'circle', SpinnerTrackProps>(
	(props, forwardedRef) => {
		const { radius, center, thickness } = useSpinnerContext()

		return (
			<freya.circle
				ref={forwardedRef}
				r={radius}
				cx={center}
				cy={center}
				fill="none"
				stroke="currentColor"
				strokeWidth={thickness}
				{...props}
			/>
		)
	}
)
