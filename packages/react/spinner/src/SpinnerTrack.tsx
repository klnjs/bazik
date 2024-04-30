import { poly, type PolyProps } from '@klnjs/core'
import { useSpinnerContext } from './SpinnerContext'

export type SpinnerTrackProps = PolyProps<'circle'>

export const SpinnerTrack =
	(props: SpinnerTrackProps) => {
		const { radius, center, width } = useSpinnerContext()

		return (
			<poly.circle
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
