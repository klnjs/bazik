import { poly, forwardRef, type CoreProps } from '@klnjs/core'
import { useSpinnerContext } from './SpinnerContext'

export type SpinnerTrackProps = CoreProps<'circle'>

export const SpinnerTrack = forwardRef<'circle', SpinnerTrackProps>(
	(props, forwardedRef) => {
		const { radius, center, width } = useSpinnerContext()

		return (
			<poly.circle
				ref={forwardedRef}
				r={radius}
				cx={center}
				cy={center}
				fill="none"
				stroke="currentColor"
				strokeWidth={width}
				{...props}
			/>
		)
	}
)
