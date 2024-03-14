import { freya, forwardRef, type CoreProps } from '../core'
import { SpinnerProvider } from './SpinnerContext'
import { useSpinner, type UseSpinnerOptions } from './useSpinner'

export type SpinnerProps = CoreProps<'svg', UseSpinnerOptions>

export const Spinner = forwardRef<'svg', SpinnerProps>(
	(
		{ arc, cap, angle, radius, duration, thickness, ...otherProps },
		forwardedRef
	) => {
		const spinner = useSpinner({
			arc,
			cap,
			angle,
			radius,
			duration,
			thickness
		})

		return (
			<SpinnerProvider value={spinner}>
				<freya.svg
					ref={forwardedRef}
					xmlns="http://www.w3.org/2000/svg"
					viewBox={`0 0 ${spinner.diameter} ${spinner.diameter}`}
					width={spinner.diameter}
					height={spinner.diameter}
					fill="currentColor"
					{...otherProps}
				/>
			</SpinnerProvider>
		)
	}
)
